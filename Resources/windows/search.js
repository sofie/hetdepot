/*
 * Search window
 */

(function() {
	
	Uit.ui.createSearchWindow = function() {
		var searchWin = Titanium.UI.createWindow(commonStyle.windowNoLayout);

		var lblTitle = Titanium.UI.createLabel({
			text : 'Zoeken',
			color : '#fff',
			font : FontLubalinTitle
		});
		searchWin.setTitleControl(lblTitle);

		searchWin.addEventListener('open', function() {
			Titanium.API.info('Search window opened');
		});
		searchWin.addEventListener('blur', function() {
			Titanium.API.info('Search window blured');
		});
		searchWin.addEventListener('close', function() {
			Titanium.API.info('Search window closed');
		});
		//LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		backButton.addEventListener('click', function() {
			Titanium.App.navTab1.close(searchWin, {
				animated : false
			});
		});
		searchWin.leftNavButton = backButton;

		var searchBg = Titanium.UI.createView({
			width : 320,
			height : 43,
			top : 0,
			left : 0,
			backgroundImage : 'img/bg_search.png'
		});
		searchWin.add(searchBg);

		var searchBar = Titanium.UI.createTextField({
			hintText : 'Zoek op naam...',
			top : 7,
			left : 40,
			width : 265,
			height : 30,
			color : '#b3b3b3',
			font : {
				fontFamily : 'Tahoma',
				fontSize : 14
			},
			returnKeyType : Titanium.UI.RETURNKEY_SEARCH
		});
		searchWin.add(searchBar);

		searchBar.addEventListener('change', function() {
			getConcertsByName();
			lblTap.hide();
		});
		var lblTap = Titanium.UI.createLabel({
			text : 'Tik in het zoekveld om te zoeken.',
			width : 'auto',
			left : 20,
			right : 20,
			height : 40,
			top : 60,
			font : FontNormal,
			color : '#555'
		});
		searchWin.add(lblTap);

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

			if(url === 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=') {
				url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;
			} else {
				url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer + '&q=' + searchBar.value;
			}

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
							height : 'auto',
							rightImage : 'img/detail.png',
							backgroundImage : 'img/bg.png'
						});
						row.filter = list[i].evNaam;

						if(evenementImg !== '') {
							var img = imgThumb;
						} else {
							img = 'img/no_thumb.jpg';
						}

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
							top : 0,
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
						top : 44,
						left : 0,
						right : 0,
						bottom : 373,
						backgroundImage : '/img/bg.png',
						scrollable : true
					});
					searchWin.add(listLinks);
					searchBar.addEventListener('return', function(e) {
						listLinks.setData(data);
						listLinks.setBottom(0);
					});
					//Open detail van window
					listLinks.addEventListener('click', function(e) {
						Titanium.App.searchValue = searchBar.value;

						Titanium.App.selectedIndex = list[e.index].cdbid;
						Titanium.API.info(Titanium.App.selectedIndex);

						Titanium.App.navTab1.open(Uit.ui.createDetailWindow());

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
		}


		searchWin.open();
		return searchWin;
	};
})();
