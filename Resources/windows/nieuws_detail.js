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
		
		var webview = Titanium.UI.createWebView({
			url : Titanium.App.selectedItemNieuws,
			width : 440,
			left : 0,
			top : 0,
			bottom : 40
		});

		//Navigeren in webview
		/*var goBackBtnWindow = Titanium.UI.createButton(commonStyle.backButton);
		goBackBtnWindow.addEventListener('click', function() {
			webview.goBack();
		});
		windowLink.rightNavButton = goBackBtnWindow;
		*/
		detailWin.add(webview);
		/*Titanium.App.navTab2.open(windowLink, {
			animated : false
		});*/

		return detailWin;
	};
})();
