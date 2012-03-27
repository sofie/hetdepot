//Zoek window

(function() {

	Uit.ui.createSearchWindow = function() {
		var searchWin = Titanium.UI.createWindow(commonStyle.windowNoLayout);

		var lblAddTitle = Titanium.UI.createLabel({
			text : 'Zoek concert',
			color : '#fff',
			font : FontLubalinTitle
		});
		searchWin.setTitleControl(lblAddTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(commonStyle.backButton);

		backButton.addEventListener('click', function() {
			Uit.navGroup.close(searchWin, {
				animated : false
			});
		});
		searchWin.leftNavButton = backButton;

		//
		//Inhoud window
		//
		var searchBar = Titanium.UI.createTextField({
			color : '#888',
			top : 10,
			left : 20,
			right : 20,
			height : 30,
			hintText : 'Zoek op naam',
			font : FontTextField,
			opacity : 0.65,
			keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
			returnKeyType : Titanium.UI.RETURNKEY_DONE,
			borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS
		});
		
		/*
		var searchBar = Titanium.UI.createSearchBar({
			barColor : '#fff',
			height : 40,
			top : 10,
			left:15,
			right:15,
			hintText:'Zoek op naam',
			font : FontTextField
		});
		*/
		searchWin.add(searchBar);
		
		var btnSearch = Titanium.UI.createButton({
			backgroundImage : "img/btn_zoeken.png",
			width : 100,
			height : 33,
			top : 50,
			right : 20
		});
		searchWin.add(btnSearch);

		btnSearch.addEventListener('click', function() {
			getLinks();
		});
		
		function getLinks() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_itemsearch.php");

			var params = {
				eDateStart : searchBar.value
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var search = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(search.searchItem === false) {
						
						var viewBg = Titanium.UI.createView({
							backgroundImage:'img/bg.png',
							width:'100%',
							height:'100%',
							top:98
						});
						
						//Titanium.API.info(this.responseText);
						var lblNoConcert = Titanium.UI.createLabel({
							text : 'Geen concert gevonden voor zoekterm "' + searchBar.value + '".',
							top : 0,
							left : 20,
							right : 30,
							textAlign:'left',
							width : 'auto',
							height : 'auto',
							color : '#D64027',
							font : FontLubalin
						});
						viewBg.add(lblNoConcert);
						searchWin.add(viewBg);

					} else {
						Titanium.API.info(this.responseText);
						for(var i = 0, j = search.length;i<j; i++) {
						//for(var i = 0; i < search.length; i++) {

							var evenementNaam = search[i].evNaam,
								evenementId = search[i].evId,
								evenementDatum = search[i].evDate,
								evenementLocatie = search[i].evLocatie,
								evenementImg = search[i].evImage,
								evenementQry = search[i].qry;
							
							Titanium.API.info('Qry: '+evenementQry);

							var row = Ti.UI.createTableViewRow({
								height : 'auto',
								rightImage : 'img/detail.png',
								backgroundImage:'img/bg.png'
							});

							//Image croppen in vierkant
							var baseImage = Ti.UI.createImageView({
								image : evenementImg,
								width : 200,
								height : 200
							});

							var cropView = Titanium.UI.createView({
								width : 70,
								height : 70,
								backgroundColor : '#000'
							});

							cropView.add(baseImage);
							baseImage.left = -50;

							var croppedImage = cropView.toImage();

							var imageView = Titanium.UI.createImageView({
								image : croppedImage,
								width : 90,
								height : 90,
								left : 0,
								top : 0
							});

							var name = Ti.UI.createLabel({
								text : evenementNaam,
								left : 100,
								top : 8,
								width : 'auto',
								height : 50,
								textAlign : 'left',
								font : FontTitleSmall
							});
							var date = Ti.UI.createLabel({
								text : evenementDatum,
								bottom : 8,
								left : 100,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								font : FontSmall
							});

							var loc = Ti.UI.createLabel({
								text : '/ ' + evenementLocatie,
								bottom : 8,
								left : 173,
								width : 140,
								height : 18,
								textAlign : 'left',
								font : FontSmall
							});
							row.add(imageView);
							row.add(name);
							row.add(date);
							row.add(loc);

							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView({
							top : 100,
							left : 0,
							right : 5,
							bottom : 0,
							data : data,
							backgroundImage : '/img/bg.png'
						});
						searchWin.add(listLinks);

						//Open detail van window

						listLinks.addEventListener('click', function(e) {
							Titanium.App.selectedIndex = search[e.index].evId;
							Uit.navGroup.open(Uit.ui.createDetailWindow()/*,{animated:false}*/);
						});
					}

				} catch(e) {
					Titanium.API.info(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}

		return searchWin;
	};
})();
