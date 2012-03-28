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

		var searchBar = Titanium.UI.createSearchBar({
			hintText : 'Zoek op naam...',
			returnKeyType : Titanium.UI.RETURNKEY_DEFAULT
		});

		getLinks();

		function getLinks() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_itemsearch.php");

			var params = {
				//eName:searchBar.value
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					//Geen concerten in de databank
					if(list.getItem === false) {
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn geen concerten gevonden.',
							color : '#D64027',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto',
							font : FontNormal
						});
						searchWin.add(lblNoLinks);

					} else {
						for(var i = 0, j = list.length; i < j; i++) {
							Titanium.App.evNaam1 = list[i].evNaam;
							var evenementId = list[i].evId, evenementNaam = list[i].evNaam, evenementDatum = list[i].evDate, evenementLocatie = list[i].evLocatie, evenementImg = list[i].evImage;

							var row = Ti.UI.createTableViewRow({
								height : 'auto',
								rightImage : 'img/detail.png',
								backgroundImage : 'img/bg.png'
							});
							row.filter = list[i].evNaam;

							//Image croppen in vierkant
							var baseImage = Ti.UI.createImageView({
								image : evenementImg,
								width : 200,
								height : 'auto'
							});

							var cropView = Titanium.UI.createView({
								width : 70,
								height : 50,
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

							data.push(row);
						};

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

						searchBar.addEventListener('change', function(e) {
							listLinks.setData(data);
							listLinks.setBottom(0);
						});
						
						searchBar.addEventListener('return', function(e) {
							Titanium.API.info('searchBar.value');
							Titanium.API.info(searchBar.value);
						});
						
						var listLinks = Titanium.UI.createTableView({
							search : searchBar,
							filterAttribute : 'filter',
							top : 0,
							left : 0,
							right : 0,
							bottom : 373,
							backgroundImage : '/img/bg.png',
							scrollable : true
						});
						searchWin.add(listLinks);

						//Open detail van window

						listLinks.addEventListener('click', function(e) {
							//selectedIndex is nu over heel de app beschikbaar
							Titanium.App.selectedIndex = list[e.index].evId;
							Uit.navGroup.open(Uit.ui.createDetailWindow(), {
								animated : false
							});

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
