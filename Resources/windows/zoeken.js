/*
 * Search window
 */

(function() {
	Uit.ui.createSearchWindow = function() {

		var titlebarImg = mergeObjects(commonStyle.window, {
			barImage : 'img/header_zoeken.png'
		});
		var searchWin = Titanium.UI.createWindow(titlebarImg);

		//LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		backButton.addEventListener('click', function() {
			Titanium.App.navTab1.close(searchWin, {
				animated : false
			});
		});
		searchWin.leftNavButton = backButton;
		
		var searchBg = Titanium.UI.createView({
			backgroundImage : 'img/bg_search.png',
			width : 320,
			height : 43,
			top : 0,
			left : 0
		});
		searchWin.add(searchBg);

		var searchBar = Titanium.UI.createTextField({
			hintText : 'Zoek op naam...',
			color : '#b3b3b3',
			font : {
				fontFamily : 'Tahoma',
				fontSize : 14
			},
			returnKeyType : Titanium.UI.RETURNKEY_SEARCH,
			width : 265,
			height : 30,
			top : 7,
			left : 40,
		});
		searchWin.add(searchBar);

		searchBar.addEventListener('change', function() {
			getConcertsByName();
			lblInstruction.hide();
		});
		var lblInstruction = Titanium.UI.createLabel({
			text : 'Tik in het zoekveld om te zoeken.',
			width : 'auto',
			font : FontNormal,
			color : '#555',
			left : 20,
			right : 20,
			height : 40,
			top : 60
		});
		searchWin.add(lblInstruction);

		Titanium.App.addEventListener('app:reloadSearch', function(e) {
			searchBar.setValue(Titanium.App.searchValue);
		});
		//
		// HTTP CLIENT GETCONCERTBYNAME
		//
		function getConcertsByName() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=' + searchBar.value;
			
			if(searchBar.value === '') {
				url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			}

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					for(var i = 0, j = list.length; i < j; i++) {

						var cdbId = list[i].cdbid;
						var cdbNaam = list[i].title;
						var cdbDescription = list[i].shortdescription;

						var cdbImg = list[i].thumbnail;
						var strImg = cdbImg.substr(0, 77);
						var imgThumb = strImg + '?width=90&height=90&crop=auto';
						
						var rowHeight = mergeObjects(commonStyle.tableViewRow, {
							height : 'auto'
						});
						var row = Titanium.UI.createTableViewRow(rowHeight);

						row.filter = list[i].evNaam;

						if(cdbImg === '') {
							imgThumb = 'img/no_thumb.jpg';
						}

						var thumb = Titanium.UI.createImageView({
							image : imgThumb,
							backgroundColor : '#000',
							width : 90,
							height : 90,
							left : 0,
							top : 0
						});

						var name = Ti.UI.createLabel({
							text : cdbNaam,
							textAlign : 'left',
							font : FontTitleSmall,
							left : 100,
							top : 0,
							width : 'auto',
							height : 50
						});
						
						var descr = Ti.UI.createLabel({
							text : cdbDescription,
							textAlign : 'left',
							font : FontSmall,
							bottom : 5,
							left : 100,
							width : 205,
							height : 36
						});
						row.add(thumb);
						row.add(name);
						row.add(descr);

						data.push(row);
					};
					
					var tableViewData = Titanium.UI.createTableView({
						backgroundImage : '/img/bg.png',
						scrollable : true,
						top : 44,
						left : 0,
						right : 0,
						bottom : 373,
					});
					searchWin.add(tableViewData);
					
					searchBar.addEventListener('return', function(e) {
						tableViewData.setData(data);
						tableViewData.setBottom(0);
					});
					//Open detail van window
					tableViewData.addEventListener('click', function(e) {
						Titanium.App.searchValue = searchBar.value;

						Titanium.App.selectedIndex = list[e.index].cdbid;
						Titanium.API.info(Titanium.App.selectedIndex);

						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
							animated : false
						});

					});
				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}
			getReq.open("GET", url);

			getReq.send();
		};

		return searchWin;
	};
})();
