//Window met alle items in lijst

(function() {

	Uit.ui.createSearchDateWindow = function() {
		var searchDateWin = Titanium.UI.createWindow({
			width : '100%',
			height : '100%',
			barImage : 'img/header.png',
			backgroundImage:'img/bg.png'
		});

		var lblTitle = Titanium.UI.createLabel({
			text : 'Zoek concert',
			color : '#fff',
			font : FontLubalinTitle
		});
		searchDateWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(commonStyle.backButton);

		backButton.addEventListener('click', function() {
			Uit.navGroup.close(searchDateWin, {
				animated : false
			});
		});
		searchDateWin.leftNavButton = backButton;
		
		/*var calendarButton = Titanium.UI.createButton({
			backgroundImage:'img/btn_calendar.png',
			width:50,
			height:33
		});

		calendarButton.addEventListener('click', function() {
			
		});
		searchDateWin.rightNavButton = calendarButton;
		
		*/
		//
		// Evenementen
		//
		getConcertsByDate();
		function getConcertsByDate() {
			var data = [];
			
			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_item.php");
			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(list.getItem === false) {
						Titanium.API.info('Geen links');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen concerten.',
							color : '#D64027',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto',
							font : FontNormal
						});
						searchDateWin.add(lblNoLinks);

					} else {
						for(var i = 0, j = list.length; i < j; i++) {
							Titanium.App.evNaam1 = list[i].evNaam;
							var evenementId = list[i].evId, 
								evenementNaam = list[i].evNaam, 
								evenementDatum = list[i].evDate, evenementLocatie = list[i].evLocatie, evenementImg = list[i].evImage;

							var row = Ti.UI.createTableViewRow({
								height : 'auto',
								rightImage : 'img/detail.png',
								backgroundImage : 'img/bg.png'
							});
							row.filter = list[i].evDate;

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

						var searchBar = Titanium.UI.createSearchBar({
							hintText : 'Zoek op datum'
						});
						searchBar.addEventListener('change', function(e) {
							listLinks.setData(data);
						});
						var listLinks = Titanium.UI.createTableView({
							search : searchBar,
							filterAttribute : 'filter',
							top : 0,
							left : 0,
							right : 0,
							bottom : 0,
							backgroundImage : '/img/bg.png'
						});
						searchDateWin.add(listLinks);

						//Open detail van window

						listLinks.addEventListener('click', function(e) {
							//selectedIndex is nu over heel de app beschikbaar
							Titanium.App.selectedIndex = list[e.index].evId;
							Uit.navGroup.open(Uit.ui.createDetailWindow(), {
								animated : false
							});

						});
					}

				} catch(E) {
					alert(E);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send();
		}

		
		return searchDateWin;
	};
})();
