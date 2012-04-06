/*
 * Detail window
 */

(function() {
	Uit.ui.createDetailWindow = function() {
		
		var detailWin = Titanium.UI.createWindow(commonStyle.window);
		
		
		// LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		backButton.addEventListener('click', function() {
			Ti.App.fireEvent('app:reloadSearch', {
				action : 'Reload search'
			});
			
			Titanium.App.navTab1.close(detailWin,{animated:false});	
		});
		detailWin.leftNavButton = backButton;
		
		
		detailWin.addEventListener('blur',function(){
			Titanium.API.info('Detail window blured');
			Titanium.App.navTab1.close(detailWin,{animated:false});
		});
		
		var navActInd = Titanium.UI.createActivityIndicator();	
		detailWin.addEventListener('open',function(){
			getLinks();
			Titanium.API.info('Detail window opened');
				
			detailWin.setRightNavButton(navActInd);
			navActInd.show();
		});
		
		detailWin.addEventListener('close',function(){
			Titanium.API.info('Detail window closed');
		});		
		
	

		//HTTP CLIENT GETLINKS
		function getLinks() {	
			
			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/event/' + Titanium.App.selectedIndex + '?format=json&key=' + Uit.api_key;
			getReq.open("GET", url);

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {					
					var detail = JSON.parse(this.responseText);

					var evenementNaam = detail.event.eventdetails.eventdetail.title.toUpperCase();
					var evenementDatum = detail.event.calendar.timestamps.timestamp.date;
					var evJaar = evenementDatum.substr(2,2);
					var evMaand = evenementDatum.substr(5,2);
					var evDag = evenementDatum.substr(8,2);
					var prettyDate = evDag+'.'+evMaand+'.'+evJaar;
					var evenementStart = detail.event.calendar.timestamps.timestamp.timestart;
					evenementStart = evenementStart.substr(0,5);
					
					var scrollView = Titanium.UI.createScrollView({
						contentWidth : 'auto',
						contentHeight : 'auto',
						top : 0,
						bottom : 10,
						showVerticalScrollIndicator : true,
						layout : 'vertical'
					});
					
					//Als geen foto is, foto weglaten
					if(detail.event.eventdetails.eventdetail.media !== undefined) {
						var evenementImg = detail.event.eventdetails.eventdetail.media.file.hlink+'?width=320&height=175&crop=auto';
					}else{
						evenementImg = 'img/no_img.png'
					}
					
					var image = Ti.UI.createImageView({
						image : evenementImg,
						width : 320,
						height : 175,
						top:0,
						left:0
					});
					scrollView.add(image);

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

					var viewHorizontal = Titanium.UI.createView({
						width : '100%',
						height : 30,
						top : 10
					});
					var date = Ti.UI.createLabel({
						text : prettyDate,
						left : 30,
						width : 'auto',
						height : 'auto',
						textAlign : 'left',
						font : FontLubalin,
						color : '#D63F27'
					});
					viewHorizontal.add(date);

					var star1 = mergeObjects(commonStyle.starView, {
						left : 110
					})
					var star1 = Titanium.UI.createView(star1);
					viewHorizontal.add(star1);

					var start = Ti.UI.createLabel({
						text : evenementStart,
						left : 140,
						width : 'auto',
						height : 'auto',
						textAlign : 'left',
						font : FontLubalin,
						color : '#D63F27'
					});
					viewHorizontal.add(start);

					//Als prijs niet bestaat, ster en prijs niet tonen
					if(detail.event.eventdetails.eventdetail.price !== undefined) {
						var evenementPrijs = detail.event.eventdetails.eventdetail.price.pricevalue;
						var price = Ti.UI.createLabel({
							text : '€' + evenementPrijs,
							right : 30,
							width : 'auto',
							height : 'auto',
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27'
						});
						var star2 = mergeObjects(commonStyle.starView, {
							left : 200
						})
						var star2 = Titanium.UI.createView(star2);
						viewHorizontal.add(star2);

						viewHorizontal.add(price);
					};
					
					//Als er geen longdescription is, shortdescription laten zien
					if(detail.event.eventdetails.eventdetail.longdescription !== undefined) {
						var evenementDescription = detail.event.eventdetails.eventdetail.longdescription;
					}else{
						evenementDescription=detail.event.eventdetails.eventdetail.shortdescription;
					};
					evenementDescription=evenementDescription.replace(/\n/gi, " ");

					var HtmlParser = function(evenementDescription) {
						var html = evenementDescription;
						var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;

						this.getHTML = function() {
							return html;
						};
					};
					var parser = new HtmlParser(evenementDescription);
					var web = Ti.UI.createWebView({
						html : parser.getHTML(),
						width : 270,
						height : 'auto',
						top : 5,
						backgroundColor : 'transparent',
						touchEnabled:false
					});
					
					var ticketsPijl = Titanium.UI.createView({
						width:12,
						height:12,
						top:5,
						left:30,
						backgroundImage:'/img/bg-red-circle.png'
					});
					

					var ticketsLink = Ti.UI.createLabel({
						text : 'tickets',
						top :-17,
						left : 47,
						bottom:40,
						height : 'auto',
						textAlign : 'left',
						color:'#602210',
						font : FontLubalin
					});
					
					ticketsLink.addEventListener('click', function(e) {
						windowLink.open({
							modal : true,
							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL, 
	    					modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT, 
						});
					});
					
					
					//
					//Webview window
					//
					var webview = Titanium.UI.createWebView({
						url : 'http://www.hetdepot.be/'
					});

					var windowLink = Titanium.UI.createWindow(commonStyle.window);
					var lblTitle = Titanium.UI.createLabel({
						text : 'Bestel tickets',
						color : '#fff',
						font : FontLubalinTitle
					});
					windowLink.setTitleControl(lblTitle);

					var backBtnLinkWindow = Titanium.UI.createButton(commonStyle.downButton);
					backBtnLinkWindow.addEventListener('click', function() {
						windowLink.close({
							animated : false
						});
						Titanium.App.navTab1.open(Uit.ui.createDetailWindow(),{
							animated:false
						},{title:'Detail'});
					});
					windowLink.leftNavButton = backBtnLinkWindow;

					windowLink.add(webview);
					
					var footer = Titanium.UI.createView({
						backgroundColor:'#361C00',
						left:10,
						right:10,
						top:-15,
						bottom:40,
						height:40
					});
					var hetdepot = Titanium.UI.createLabel({
						text:'© Het Depot',
						left:10,
						font:FontSmall,
						color:'#fff'
					});
					var tel = Titanium.UI.createLabel({
						text:'T: 016220603',
						left:95,
						font:FontSmall,
						color:'#fff'
					});
					tel.addEventListener('click',function(){
						Titanium.Platform.openURL('tel:016220603')
					});
					var mail = Titanium.UI.createLabel({
						text:'info@hetdepot.be',
						top:0,
						left:190,
						font:FontSmall,
						color:'#fff'
					});
					mail.addEventListener('click',function(){
						Titanium.Platform.openURL('mail:info@hetdepot.be')
					});
					footer.add(hetdepot);
					footer.add(tel);
					footer.add(mail);
					
					scrollView.add(viewBlue);
					scrollView.add(name);
					scrollView.add(viewHorizontal);
					scrollView.add(web);
					scrollView.add(ticketsPijl);
					scrollView.add(ticketsLink);
					
					scrollView.add(footer);
					
					//Kleine windows toch laten scrollen
					setTimeout(function() {
					    if(web.size.height<110){
					    	if(web.size.height===76){
					    		//3 lijnen description
					    		ticketsLink.setBottom(65);
					    	
					    	}else if(web.size.height===56){
					    		//2 lijnen description
					    		ticketsLink.setBottom(85);
					    	}else{
					    		//1 lijn description
					    		ticketsLink.setBottom(105);
					    	}
					    	
					    	scrollView.scrollTo(0,0);
					    }
					}, 500);
					
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

			getReq.send();
		
			
		}
		
		
		return detailWin;
	};
})();
