/*
 * Detail window
 */

(function() {
	Uit.ui.createConcertDetailWindow = function() {

		var detailWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header_detail.png'
		}));

		// LEFT NAVBAR BACK BUTTON
		var backButton = Ti.UI.createButton(style.backButton);
		backButton.addEventListener('click', function() {
			Ti.App.fireEvent('app:reloadSearch', {
				action : 'Reload search'
			});
			
			Titanium.App.navTab1.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;

		detailWin.addEventListener('blur', function(e) {
			Titanium.App.navTab1.close(detailWin, {
				animated : false
			});
		});
		var navActInd = Titanium.UI.createActivityIndicator();

		detailWin.addEventListener('open', function(e) {
			getData();

			detailWin.setRightNavButton(navActInd);
			navActInd.show();
		});
		//HTTP CLIENT GETDATA
		function getData() {
			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/event/' + Titanium.App.selectedIndex + '?format=json&key=' + Uit.api_key;

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var detail = JSON.parse(this.responseText);

					var cdbNaam = detail.event.eventdetails.eventdetail.title.toUpperCase();

					var cdbDatum = detail.event.calendar.timestamps.timestamp.date;
					var jaar = cdbDatum.substr(2, 2);
					var maand = cdbDatum.substr(5, 2);
					var dag = cdbDatum.substr(8, 2);
					var prettyDate = dag + '.' + maand + '.' + jaar;

					var cdbStart = detail.event.calendar.timestamps.timestamp.timestart;
					cdbStart = cdbStart.substr(0, 5);
					var cdbImg = detail.event.eventdetails.eventdetail.media;
					var cdbPrijs = detail.event.eventdetails.eventdetail.price;
					var cdbDescription = detail.event.eventdetails.eventdetail.longdescription;
					var cdbTel = detail.event.contactinfo.phone.value;
					var cdbMail = detail.event.contactinfo.mail;

					var scrollView = Titanium.UI.createScrollView(style.scrollView);

					//Als geen foto is, foto weglaten
					if(cdbImg !== undefined) {
						cdbImg = cdbImg.file.hlink + '?width=320&height=175&crop=auto';
					} else {
						cdbImg = 'img/no_img.png'
					}

					var image = Ti.UI.createImageView(Uit.combine(style.Img320, {
						image : cdbImg,
						defaultImage:'img/default_img.png'
					}));
					scrollView.add(image);

					var viewBlue = Titanium.UI.createView(style.viewBlue);

					var name = Titanium.UI.createLabel(Uit.combine(style.titleNaamWhite, {
						text : cdbNaam
					}));

					var viewHorizontal = Titanium.UI.createView(style.horizontalView);

					var date = Ti.UI.createLabel(Uit.combine(style.textLubalin, {
						text : prettyDate
					}));
					viewHorizontal.add(date);

					var star1 = Titanium.UI.createView(style.starView1);
					viewHorizontal.add(star1);

					var start = Ti.UI.createLabel(Uit.combine(style.textLubalin, {
						text : cdbStart,
						left : 140
					}));
					viewHorizontal.add(start);

					//Als prijs niet bestaat, ster en prijs niet tonen
					if(cdbPrijs !== undefined) {
						cdbPrijs = cdbPrijs.pricevalue;
						var price = Ti.UI.createLabel(Uit.combine(style.textLubalin, {
							text : '€' + cdbPrijs,
							right : -185
						}));

						var star2 = Titanium.UI.createView(style.starView2);

						viewHorizontal.add(star2);
						viewHorizontal.add(price);
					};

					//Als er geen longdescription is, shortdescription laten zien
					if(cdbDescription === undefined) {
						cdbDescription = detail.event.eventdetails.eventdetail.shortdescription;
					};
					cdbDescription = cdbDescription.replace(/\n/gi, " ");

					var HtmlParser = function(cdbDescription) {
						var html = cdbDescription;
						var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;

						this.getHTML = function() {
							return html;
						};
					};
					var parser = new HtmlParser(cdbDescription);
					var web = Ti.UI.createWebView(Uit.combine(style.webViewDescription, {
						html : "<div style=\"font-family: " + Uit.basic_font + "; font-size:11px; line-height:16px;\">" + parser.getHTML() + "</div>"
					}));

					var ticketsPijl = Titanium.UI.createView(style.orangeArrow);

					var ticketsLink = Ti.UI.createLabel(Uit.combine(style.textTickets, {
						text : 'tickets'
					}));

					ticketsLink.addEventListener('click', function(e) {
						windowLink.open({
							modal : true,
							modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
							modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT,
						});
					});
					//
					//Webview window
					//
					var webview = Titanium.UI.createWebView({
						url : Uit.app_site
					});

					var windowLink = Titanium.UI.createWindow(Uit.combine(style.Window, {
						barImage : 'img/header_tickets.png'
					}));

					var backBtnLinkWindow = Titanium.UI.createButton(style.downButton);
					backBtnLinkWindow.addEventListener('click', function() {
						windowLink.close({
							animated : false
						});
						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
							animated : false
						});
					});
					windowLink.leftNavButton = backBtnLinkWindow;

					windowLink.add(webview);

					//Donker rode balk
					var footer = Titanium.UI.createView(style.footerView);

					var organiser = Titanium.UI.createLabel(Uit.combine(style.textFooter, {
						text : '© ' + Uit.app_name,
						left : 10
					}));
					var tel = Titanium.UI.createLabel(Uit.combine(style.textFooter, {
						text : 'T: ' + cdbTel,
						left : 85
					}));
					tel.addEventListener('click', function() {
						Titanium.Platform.openURL('tel:' + Uit.app_tel)
					});
					var mail = Titanium.UI.createLabel(Uit.combine(style.textFooter, {
						text : cdbMail,
						left : 190
					}));
					mail.addEventListener('click', function() {
						Titanium.Platform.openURL('mail:' + Uit.app_mail)
					});
					footer.add(organiser);
					footer.add(tel);
					footer.add(mail);

					scrollView.add(viewBlue);
					scrollView.add(name);
					scrollView.add(viewHorizontal);
					scrollView.add(web);
					scrollView.add(ticketsPijl);
					scrollView.add(ticketsLink);
					scrollView.add(footer);

					detailWin.add(scrollView);
					navActInd.hide();

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

		return detailWin;
	};
})();
