(function() {

	Uit.ui.createLijstWindow = function() {
		var mainWin = Titanium.UI.createWindow(commonStyle.windowNoLayout);
		
		var lblTitle = Titanium.UI.createLabel({
			text : 'Evenementen',
			color : '#fff',
			font : {
				fontSize : 24,
				fontWeight:'bold'
			}
		});
		mainWin.setTitleControl(lblTitle);
		//
		// Evenementen
		//
		getLinks();
		function getLinks() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_item.php");
			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(list.getItem == false) {
						Titanium.API.info('Geen links');
						var lblNoLinks = Titanium.UI.createLabel({
							top : 70,
							text : 'Er zijn nog geen links. Maak 1 aan.',
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						mainWindow.add(lblNoLinks);

					} else {

						for(var i = 0; i < list.length; i++) {
							Titanium.App.evNaam1 = list[i].evNaam;

							var evenementNaam = list[i].evNaam;
							var evenementLocatie = list[i].evLocatie;
							var evenementImg = list[i].evImage;

							var row = Ti.UI.createTableViewRow({
								height : 'auto'
							});

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
								height : 'auto',
								textAlign : 'left',
								font : {
									fontSize : 16,
									fontWeight : 'bold'
								}
							});
							var loc = Ti.UI.createLabel({
								text : evenementLocatie,
								bottom : 8,
								left : 100,
								width : 'auto',
								height : 'auto',
								textAlign : 'left',
								font : {
									fontSize : 13
								}
							});
							row.add(imageView);
							row.add(name);
							row.add(loc);

							row.className = 'item' + i;
							data[i] = row;
						};

						var listLinks = Titanium.UI.createTableView({
							top : 0,
							left : 0,
							right : 5,
							bottom : 0,
							data : data
						});
						mainWin.add(listLinks);

						//Open detail van window

						listLinks.addEventListener('click', function(e) {
							Titanium.App.selectedIndex= e.index;
							Titanium.API.info('Index from lijst:'+Titanium.App.selectedIndex);
							
							Uit.navGroup.open(Uit.ui.createDetailWindow());
							
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

		return mainWin;
	};
})();
