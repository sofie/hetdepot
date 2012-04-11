/*
 * Detail window
 */

(function() {
	Uit.ui.createNieuwsDetailWindow = function() {

		var titlebarImg = mergeObjects(commonStyle.window, {
			barImage : 'img/header_nieuws.png'
		});
		var detailWin = Titanium.UI.createWindow(titlebarImg);

		// LEFT NAVBAR BACK BUTTON
		var backButton = Titanium.UI.createButton(commonStyle.backButton);
		backButton.addEventListener('click', function() {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		detailWin.leftNavButton = backButton;

		detailWin.addEventListener('blur', function(e) {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		detailWin.addEventListener('close', function(e) {
			Titanium.App.navTab2.close(detailWin, {
				animated : false
			});
		});
		var navActInd = Titanium.UI.createActivityIndicator();

		detailWin.addEventListener('open', function(e) {
			detailWin.setRightNavButton(navActInd);
			navActInd.show();
		});
		
		var prev = Titanium.UI.createButton({
			backgroundImage:'img/prev.png',
			height:14,
			width:14,
			left:20
		});
		
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		var next = Titanium.UI.createButton({
			backgroundImage:'img/next.png',
			height:14,
			width:14,
			right:20
		});
		
		var toolbarView = Titanium.UI.createView({
			width:320,
			height:25,
			top:0,
			backgroundImage:'img/toolbar_gradient.png'
		});
		toolbarView.add(prev);
		toolbarView.add(next);
		detailWin.add(toolbarView);
		
		
		/*
		flexSpace = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var toolbar = Titanium.UI.iOS.createToolbar({
			items : [prev, flexSpace, next],
			top : 0,
			translucent:true,
			borderTop : false,
			borderBottom : true
		});
		detailWin.add(toolbar);
		*/

		var webview = Titanium.UI.createWebView({
			url : Titanium.App.selectedItemNieuws,
			width : 440,
			left : 0,
			top : 25,
			bottom : 40
		});
		webview.addEventListener('load', function() {
			navActInd.hide();
		});
		//Navigeren in webview
		/*var goBackBtnWindow = Titanium.UI.createButton(commonStyle.backButton);
		 goBackBtnWindow.addEventListener('click', function() {
		 webview.goBack();
		 });
		 windowLink.rightNavButton = goBackBtnWindow;
		 */
		detailWin.add(webview);

		return detailWin;
	};
})();
