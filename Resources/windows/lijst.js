/*
 * Eerste tab, alle concerten in tableview
 */

(function() {
	Uit.ui.createLijstWindow = function() {
		
		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab1);

		var titlebarImg = mergeObjects(commonStyle.window, {
			barImage : 'img/header.png'
		});
		var lijstWin = Titanium.UI.createWindow(titlebarImg);

		var lblTitle = Titanium.UI.createLabel({
			text : 'Concerten',
			color : '#fff',
			font : FontLubalinTitle
		});
		lijstWin.setTitleControl(lblTitle);		
		
		// LEFT NAVBAR REFRESH BUTTON
		var searchButton = Titanium.UI.createButton(commonStyle.searchButton);
		searchButton.addEventListener('click', function() {
			var searchWin = Uit.ui.createSearchWindow();
			Titanium.App.navTab1.open(searchWin,{animated:false});
		});
		lijstWin.leftNavButton = searchButton;
		
		// RIGHT NAVBAR REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(commonStyle.refreshButton);
		refreshButton.addEventListener('click', function() {
			Titanium.API.info('Refresh concerten');
			Uit.ui.activityIndicator.showModal('Loading concerts...', 10000, 'Het Depot timed out. All streams may not have updated.');
			getConcerts();
		});
		lijstWin.rightNavButton=refreshButton;
		
		lijstWin.addEventListener('close',function(){
			Titanium.API.info('Lijst window'+e.type);
		});
		lijstWin.addEventListener('open',function(e){
			Titanium.API.info('Lijst window '+e.type);	
			getConcerts();
		});

		//
		// HTTP CLIENT GETCONCERTS
		//
		function getConcerts() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			
			//Geen internet
			if(!Titanium.Network.online){
			     alert("You must be connected to the internet to retrieve Het Depot information");
			}
			
			getReq.open("GET", url);
			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					for(var i = 0, j = list.length; i < j; i++) {
						Titanium.App.evNaam1 = list[i].title;
						var concertId = list[i].cdbid;
						var concertNaam = list[i].title;
						var concertDescription = list[i].shortdescription;
						
						var concertImg = list[i].thumbnail;
						var strImg = concertImg.substr(0, 77);
						var imgThumb = strImg + '?width=90&height=90&crop=auto';

						var row = Ti.UI.createTableViewRow({
							height : 92,
							rightImage : 'img/detail.png',
							backgroundImage : 'img/bg.png',
							layout : 'vertical',
							selectedBackgroundColor : '#B8DAE8'
						});

						if(concertImg!== '') {
							var img = imgThumb;
						}else{
							img='img/no_thumb.jpg';
						};
						
						var image = Titanium.UI.createImageView({
							image : img,
							backgroundColor : '#000',
							width : 90,
							height : 90,
							left : 0,
							top : 0
						});

						var name = Ti.UI.createLabel({
							text : concertNaam,
							left : 100,
							top : -95,
							width : 'auto',
							height : 50,
							textAlign : 'left',
							font : FontTitleSmall
						});
						var descr = Ti.UI.createLabel({
							text : concertDescription,
							bottom : 5,
							left : 100,
							width : 205,
							height : 36,
							textAlign : 'left',
							font : FontSmall
						});
						
						row.add(image);
						row.add(name);
						row.add(descr);

						data.push(row);
					};
					
					var listLinks = Titanium.UI.createTableView({
						top : 0,
						left : 0,
						right : 0,
						bottom : 40,
						data:data,
						backgroundImage : '/img/bg.png'
					});
					lijstWin.add(listLinks);
					Titanium.App.tableView = listLinks;

					//Open detail window
					listLinks.addEventListener('click', function(e) {
						Titanium.App.selectedIndex = list[e.index].cdbid;
						Titanium.App.rowIndex = e.index;
						Titanium.App.concertNaam = list[e.index].title.toUpperCase();

						Titanium.App.navTab1.open(Uit.ui.createDetailWindow(),{
							animated:false
						});

					});
					Uit.ui.activityIndicator.hideModal();
					Titanium.App.tableView = listLinks;
					
					
				} catch(e) {
					alert(e);
				}
			};

			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Kan gegevens niet ophalen.');
				Uit.ui.activityIndicator.hideModal();
			};

			getReq.send();
		};
		
		return lijstWin;
	};
})();
