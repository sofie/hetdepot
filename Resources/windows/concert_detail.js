/*
 * Detail window
 */

(function() {
	Uit.ui.createConcertDetailWindow = function() {
		
		var titlebarImg = mergeObjects(commonStyle.window, {
			barImage : 'img/header_detail.png'
		});
		var detailWin = Titanium.UI.createWindow(titlebarImg);
	
		// LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		backButton.addEventListener('click', function() {
			Ti.App.fireEvent('app:reloadSearch', {
				action : 'Reload search'
			});
			Titanium.App.navTab1.close(detailWin,{animated:false});	
		});
		detailWin.leftNavButton = backButton;
			
		detailWin.addEventListener('blur',function(e){
			Titanium.App.navTab1.close(detailWin,{animated:false});
		});
		
		var navActInd = Titanium.UI.createActivityIndicator();	
		
		detailWin.addEventListener('open',function(e){
			getData();
				
			detailWin.setRightNavButton(navActInd);
			navActInd.show();
		});
		
		
		//HTTP CLIENT GETDATA
		function getData() {	
			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/event/' + Titanium.App.selectedIndex + '?format=json&key=' + Uit.api_key;
			getReq.open("GET", url);

			getReq.timeout = 5000;
			getReq.onload = function() {
				try {					
					var detail = JSON.parse(this.responseText);

					var cdbNaam = detail.event.eventdetails.eventdetail.title.toUpperCase();
					
					var cdbDatum = detail.event.calendar.timestamps.timestamp.date;
					var jaar = cdbDatum.substr(2,2);
					var maand = cdbDatum.substr(5,2);
					var dag = cdbDatum.substr(8,2);
					var prettyDate = dag+'.'+maand+'.'+jaar;
					
					var cdbStart = detail.event.calendar.timestamps.timestamp.timestart;
					cdbStart = cdbStart.substr(0,5);
					
					var scrollView = Titanium.UI.createScrollView({
						contentWidth : 'auto',
						contentHeight : 'auto',
						showVerticalScrollIndicator : true,
						layout : 'vertical',
						top : 0,
						bottom : 10,
					});
					
					//Als geen foto is, foto weglaten
					if(detail.event.eventdetails.eventdetail.media !== undefined) {
						var cdbImg = detail.event.eventdetails.eventdetail.media.file.hlink+'?width=320&height=175&crop=auto';
					}else{
						cdbImg = 'img/no_img.png'
					}
					
					var image = Ti.UI.createImageView({
						image : cdbImg,
						width : 320,
						height : 175,
						top:0,
						left:0
					});
					scrollView.add(image);

					var viewBlue = Titanium.UI.createView({
						width : '100%',
						backgroundColor : '#86B6CD',
						height : 30,
						top : 0,
						right : 0
					});

					var name = Titanium.UI.createLabel({
						text : cdbNaam,
						textAlign : 'left',
						font : FontTitle,
						color : '#fff',
						width : 300,
						height : 25,
						top : -28,
						left : 10
					});

					var viewHorizontal = Titanium.UI.createView({
						width : '100%',
						height : 30,
						top : 10
					});
					var date = Ti.UI.createLabel({
						text : prettyDate,
						textAlign : 'left',
						font : FontLubalin,
						color : '#D63F27',
						width : 'auto',
						height : 'auto',
						left : 30
					});
					viewHorizontal.add(date);

					var star1 = mergeObjects(commonStyle.starView, {
						left : 110
					})
					var star1 = Titanium.UI.createView(star1);
					viewHorizontal.add(star1);

					var start = Ti.UI.createLabel({
						text : cdbStart,
						textAlign : 'left',
						font : FontLubalin,
						color : '#D63F27',
						width : 'auto',
						height : 'auto',
						left : 140
					});
					viewHorizontal.add(start);

					//Als prijs niet bestaat, ster en prijs niet tonen
					if(detail.event.eventdetails.eventdetail.price !== undefined) {
						var cdbPrijs = detail.event.eventdetails.eventdetail.price.pricevalue;
						var price = Ti.UI.createLabel({
							text : '€' + cdbPrijs,
							textAlign : 'left',
							font : FontLubalin,
							color : '#D63F27',
							width : 'auto',
							height : 'auto',
							right : 30
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
						var cdbDescription = detail.event.eventdetails.eventdetail.longdescription;
					}else{
						cdbDescription=detail.event.eventdetails.eventdetail.shortdescription;
					};
					cdbDescription=cdbDescription.replace(/\n/gi, " ");

					var HtmlParser = function(cdbDescription) {
						var html = cdbDescription;
						var urlRegex = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;

						this.getHTML = function() {
							return html;
						};
					};
					var parser = new HtmlParser(cdbDescription);
					var web = Ti.UI.createWebView({
						html : parser.getHTML(),
						backgroundColor : 'transparent',
						touchEnabled:false,
						width : 270,
						height : 'auto',
						top : 5
					});
					
					var ticketsPijl = Titanium.UI.createView({
						backgroundImage:'/img/bg-red-circle.png',
						width:12,
						height:12,
						top:5,
						left:30
					});
					
					var ticketsLink = Ti.UI.createLabel({
						text : 'tickets',
						textAlign : 'left',
						color:'#602210',
						font : FontLubalin,
						top :-17,
						left : 47,
						bottom:40,
						height : 'auto'
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
						url : Uit.app_site
					});

					var titlebar_img = mergeObjects(commonStyle.window, {
						barImage : 'img/header_tickets.png'
					});
					var windowLink = Titanium.UI.createWindow(titlebar_img);
		
					var backBtnLinkWindow = Titanium.UI.createButton(commonStyle.backButton);
					backBtnLinkWindow.addEventListener('click', function() {
						windowLink.close({
							animated : false
						});
						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(),{animated:false});
					});
					windowLink.leftNavButton = backBtnLinkWindow;

					windowLink.add(webview);
					
					//Donker rode balk
					var footer = Titanium.UI.createView({
						backgroundColor:'#361C00',
						height:40,
						left:10,
						right:10,
						top:-15,
						bottom:40
					});
					var hetdepot = Titanium.UI.createLabel({
						text:'© '+ Uit.app_name,
						font:FontSmall,
						color:'#fff',
						left:10
					});
					var tel = Titanium.UI.createLabel({
						text:'T: 016220603',
						font:FontSmall,
						color:'#fff',
						left:95
					});
					tel.addEventListener('click',function(){
						Titanium.Platform.openURL('tel:016220603')
					});
					var mail = Titanium.UI.createLabel({
						text:'info@hetdepot.be',
						font:FontSmall,
						color:'#fff',
						top:0,
						left:190
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
