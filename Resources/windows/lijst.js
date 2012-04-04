//Window met alle items in lijst

(function() {

	Uit.ui.createLijstWindow = function() {
		var lijstWin = Titanium.UI.createWindow({
			width : '100%',
			barImage : 'img/header.png',
			tabBarHidden : true,
			backgroundImage:'img/bg.png'
		});

		var lblTitle = Titanium.UI.createLabel({
			text : 'Concerten',
			color : '#fff',
			font : FontLubalinTitle
		});
		lijstWin.setTitleControl(lblTitle);		
		
		lijstWin.addEventListener('close',function(){
			Titanium.API.info('Lijst window closed');
		});
		
		lijstWin.addEventListener('open',function(){
			Titanium.API.info('Lijst window opened');
			getConcerts();
		});
		
		
		Titanium.App.addEventListener('app:reloadRequest', function(e) {
			Titanium.API.info('Refresh concerten');
			Uit.ui.activityIndicator.showModal('Loading concerts...', 10000, 'Het Depot timed out. All streams may not have updated.');
			getConcerts();
		});
		
		lijstWin.addEventListener('close', function() {
		    Ti.App.removeEventListener('app:reloadRequest', function(e) {
				Titanium.API.info('Refresh concerten');
				Uit.ui.activityIndicator.showModal('Loading concerts...', 10000, 'Het Depot timed out. All streams may not have updated.');
				getConcerts();
			});
		});
		//
		// Evenementen
		//
		function getConcerts() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			
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
						var evenementId = list[i].cdbid;
						var evenementNaam = list[i].title;
						var evenementDescription = list[i].shortdescription;
						
						var evenementImg = list[i].thumbnail;
						var strImg = evenementImg.substr(0, 77);
						var imgThumb = strImg + '?width=90&height=90&crop=auto';

						var row = Ti.UI.createTableViewRow({
							height : 92,
							rightImage : 'img/detail.png',
							backgroundImage : 'img/bg.png',
							layout : 'vertical'
						});

						if(evenementImg!== '') {
							var img = imgThumb;
						}else{
							img='img/no_thumb.jpg';
						};
						
						var thumb = Titanium.UI.createImageView({
							image : img,
							backgroundColor : '#000',
							width : 90,
							height : 90,
							left : 0,
							top : 0
						});

						var name = Ti.UI.createLabel({
							text : evenementNaam,
							left : 100,
							top : -95,
							width : 'auto',
							height : 50,
							textAlign : 'left',
							font : FontTitleSmall
						});
						var descr = Ti.UI.createLabel({
							text : evenementDescription,
							bottom : 5,
							left : 100,
							width : 205,
							height : 36,
							textAlign : 'left',
							font : FontSmall
						});
						row.add(thumb);
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

					//Open detail window
					listLinks.addEventListener('click', function(e) {
						Titanium.App.selectedIndex = list[e.index].cdbid;
						Titanium.App.concertNaam = list[e.index].title.toUpperCase();
						Titanium.API.info('-------');
						Titanium.API.info('cdbid: ' + Titanium.App.selectedIndex);

						Titanium.App.navTab1.open(Uit.ui.createDetailWindow(),{
							animated:false
						},{title:'Detail'});

					});
					Uit.ui.activityIndicator.hideModal();
					
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
