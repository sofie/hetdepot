//Detail window van geselecteerd item

(function() {
	Uit.ui.createSearchDetailWindow = function() {
		
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
			
			//Zoekresultaten herladen
			Ti.App.fireEvent('app:reloadSearch', {
				action : 'Reload search'
			});
			detailWin.close();
			
		});
		detailWin.leftNavButton = backButton;

		//Detail van geselecteerd concert ophalen
		getLinks();
		function getLinks() {

			var getReq = Titanium.Network.createHTTPClient();
			getReq.open("GET", "http://localhost/uitinvlaanderen/get_itemdetail.php");

			var params = {
				eId : Titanium.App.selectedIndex
			};

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					//Er zijn nog geen linken in de databank
					if(detail.getItem === false) {
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
						var scrollView = Titanium.UI.createScrollView({
							contentWidth : 'auto',
							contentHeight : 'auto',
							top : 0,
							bottom : 10,
							showVerticalScrollIndicator : true,
							layout : 'vertical'
						});

						var evenementNaam = detail.evNaam, evenementImg = detail.evImage, evenementDescription = detail.evDescription, evenementDatum = detail.evDate, evenementUur = detail.evHour, evenementPrijs = detail.evPrice;

						var baseImage = Ti.UI.createImageView({
							image : evenementImg,
							width : 320,
							height : 'auto'
						});

						var cropView = Titanium.UI.createView({
							width : 320,
							height : 120,
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

						var viewBlue = Titanium.UI.createView({
							width : '100%',
							right : 0,
							top : 0,
							backgroundColor : '#86B6CD',
							height : 30
						});

						var name = Titanium.UI.createLabel({
							text : evenementNaam,
							left : 10,
							top : -28,
							width : 300,
							height : 25,
							textAlign : 'left',
							font : FontTitle,
							color : '#fff'
						});

						var viewHorizontal = Titanium.UI.createLabel({
							width : '100%',
							height : 30,
							top : 10
						});
						var date = Ti.UI.createLabel({
							text : evenementDatum,
							left : 30,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var hourLbl = Ti.UI.createLabel({
							text : 'Doors:',
							left : 125,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27'
						});

						var hour = Ti.UI.createLabel({
							text : evenementUur,
							left : 170,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var priceLbl = Ti.UI.createLabel({
							text : 'Prijs:',
							left : 230,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27'
						});

						var price = Ti.UI.createLabel({
							text : '€' + evenementPrijs,
							left : 265,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var description = Ti.UI.createLabel({
							text : evenementDescription,
							top : 15,
							left : 30,
							right : 25,
							height : 'auto',
							textAlign : 'left',
							font : FontNormal
						});

						var link = Ti.UI.createLabel({
							text : 'Tickets',
							top : 25,
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
						
						var viewSpace = Titanium.UI.createView({
							width : '100%',
							right : 0,
							top : 0,
							backgroundColor : 'transparent',
							height : 40
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

						scrollView.add(imageView);
						scrollView.add(viewBlue);
						scrollView.add(name);
						scrollView.add(viewHorizontal);
						viewHorizontal.add(date);
						viewHorizontal.add(hourLbl);
						viewHorizontal.add(hour);
						viewHorizontal.add(priceLbl);
						viewHorizontal.add(price);
						scrollView.add(description);
						scrollView.add(link);
						scrollView.add(viewSpace);

						detailWin.add(scrollView);

					}

				} catch(e) {
					alert(e);
				}
			}
			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Er is iets mis met de databank.');
			}

			getReq.send(params);
		}
		detailWin.open();
		return detailWin;
	};
})();
