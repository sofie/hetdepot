(function() {
	Uit.ui.createDetailWindow = function() {
		//
		// Main window
		//
		var detailWin = Titanium.UI.createWindow(commonStyle.windowNoLayout);

		var lblTitle = Titanium.UI.createLabel({
			text : 'Detail',
			color : '#fff',
			font : FontLubalinTitle
		});
		detailWin.setTitleControl(lblTitle);

		//Backbutton
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
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
			
			var row = Titanium.App.Properties.getString('row');

			Titanium.API.info('Index from detail:' + Titanium.App.selectedIndex);
			Titanium.API.info('Properties: '+row);
			Titanium.API.info('-------');
			
			
			
			var params = {
				eId : Titanium.App.selectedIndex + 3
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem == false) {
						Titanium.API.info(this.responseText);
						var lblNoConcert = Titanium.UI.createLabel({
							text : 'Er is iets misgegaan. Concert niet gevonden in databank.',
							top : 30,
							left : 30,
							right : 30,
							width : 'auto',
							height : 'auto',
							color : '#D64027',
							font : FontLubalin
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

						var viewOrange = Titanium.UI.createView({
							width : '100%',
							right : 0,
							top : 130,
							backgroundColor : '#86B6CD',
							height : 30
						});

						var name = Titanium.UI.createLabel({
							text : evenementNaam,
							left : 10,
							top : 132,
							width : 300,
							height : 25,
							textAlign : 'left',
							font : FontTitle,
							color : '#fff'
						});

						var date = Ti.UI.createLabel({
							text : evenementDatum,
							top : 170,
							left : 10,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var hourLbl = Ti.UI.createLabel({
							text : 'Doors:',
							top : 169,
							left : 125,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27'
						});

						var hour = Ti.UI.createLabel({
							text : evenementUur,
							top : 170,
							left : 170,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var priceLbl = Ti.UI.createLabel({
							text : 'Prijs:',
							top : 169,
							left : 240,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27'
						});

						var price = Ti.UI.createLabel({
							text : '€' + evenementPrijs,
							top : 170,
							left : 275,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var description = Ti.UI.createLabel({
							text : evenementDescription,
							top : 195,
							left : 30,
							right : 25,
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var link = Ti.UI.createLabel({
							text : 'Tickets',
							bottom : 30,
							left : 30,
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin
						});
						
						link.addEventListener('click', function(e) {
							windowLink.open({
								modal : true
							});
						});
						
						//
						//Webview window
						//
						var webview = Titanium.UI.createWebView({
							url : 'http://www.hetdepot.be/'
						});

						var windowLink = Titanium.UI.createWindow(commonStyle.windowNoLayout);
						var lblTitle = Titanium.UI.createLabel({
							text : 'Bestel tickets',
							color : '#fff',
							font : FontLubalinTitle
						});
						windowLink.setTitleControl(lblTitle);

						var backButton2 = Titanium.UI.createButton(commonStyle.backButton);
						backButton2.addEventListener('click', function() {
							windowLink.close({
								animated : false
							});
						});
						windowLink.leftNavButton = backButton2;

						windowLink.add(webview);

						

						detailWin.add(imageView);
						detailWin.add(viewOrange);
						detailWin.add(name);
						detailWin.add(date);
						detailWin.add(hourLbl);
						detailWin.add(hour);
						detailWin.add(priceLbl);
						detailWin.add(price);
						detailWin.add(description);
						detailWin.add(link);

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
