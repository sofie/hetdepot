(function() {
	Uit.ui.createDetailWindow = function() {
		//
		// Main window
		//
		var detailWin = Titanium.UI.createWindow(commonStyle.windowNoLayout);

		var lblTitle = Titanium.UI.createLabel({
			text : 'Detail',
			color : '#fff',
			font : {
				fontSize : 24,
				fontWeight : 'bold'
			}
		});
		detailWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton({
			title : 'Back'
		});
		backButton.addEventListener('click', function() {
			Uit.navGroup.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;

		getLinks();
		function getLinks() {

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_itemdetail.php");

			Titanium.API.info('Index from detail:'+Titanium.App.selectedIndex);
			Titanium.API.info('-------');

			var params = {
				eId : Titanium.App.selectedIndex+2
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem == false) {
						Titanium.API.info('Geen links');
						var lblNoConcert = Titanium.UI.createLabel({
							top : 30,
							text : 'Er is iets misgegaan. Concert niet gevonden in databank',
							color : '#AC3724',
							left : 30,
							right : 30,
							width : 300,
							height : 'auto'
						});
						detailWin.add(lblNoConcert);

					} else {

						var evenementNaam = detail.evNaam;
						var evenementImg = detail.evImage;
						var evenementDescription = detail.evDescription;
						var evenementDatum = detail.evDate;
						var evenementUur = detail.evHour;
						var evenementPrijs = detail.evPrice;

						var baseImage = Ti.UI.createImageView({
							image : evenementImg,
							width : 320,
							height : 'auto'
						});

						var cropView = Titanium.UI.createView({
							width : 320,
							height : 80,
							backgroundColor : '#000'
						});

						cropView.add(baseImage);
						baseImage.left = 0;

						var croppedImage = cropView.toImage();

						var imageView = Titanium.UI.createImageView({
							image : croppedImage,
							width : 320,
							height : 130,
							left : 0,
							top : 0
						});
					
						var view = Titanium.UI.createView({
							width : '100%',
							left : 0,
							right : 0,
							top : 130,
							backgroundColor : '#86B6CD',
							height : 30
						});

						var name = Titanium.UI.createLabel({
							text : evenementNaam,
							left : 30,
							top : 135,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : {
								fontSize : 18,
								fontWeight : 'bold'
							},
							color : '#fff'
						});
						
						
						var date = Ti.UI.createLabel({
							text : evenementDatum,
							top : 170,
							left : 30,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : {
								fontSize : 13
							}
						});
						
						var hour = Ti.UI.createLabel({
							text : 'Doors: '+evenementUur,
							top : 170,
							left : 'auto',
							right:'auto',
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : {
								fontSize : 13
							}
						});
						
						var price = Ti.UI.createLabel({
							text : 'Prijs: '+evenementPrijs,
							top : 170,
							right : 25,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : {
								fontSize : 13
							}
						});
						
						var description = Ti.UI.createLabel({
							text : evenementDescription,
							top : 195,
							left : 30,
							right : 25,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : {
								fontSize : 13
							}
						});
						detailWin.add(imageView);
						detailWin.add(view);
						detailWin.add(name);
						detailWin.add(date);
						detailWin.add(hour);
						detailWin.add(price);
						detailWin.add(description);

					}

				} catch(E) {
					alert(E);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}

		return detailWin;
	};
})();
