/*
 * Main window met tabgroup en navgroup
 */

(function() {

	Uit.ui.createApplicationMainWin = function() {

		var tabGroup = Titanium.UI.createTabGroup();

		// FIRST TAB
		var mainWinTab1 = Uit.ui.createLijstWindow();
		var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab1
		});
		Titanium.App.navTab1 = navTab1;
		var baseWinTab1 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true
		});
		baseWinTab1.add(navTab1);

		// SECOND TAB
		var mainWinTab2 = Uit.ui.createNieuwsWindow();

		var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab2
		});
		Titanium.App.navTab2 = navTab2;

		var baseWinTab2 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden : true
		});
		baseWinTab2.add(navTab2);

		//TAB GROUP
		var tab1 = Titanium.UI.createTab({
			window : baseWinTab1
		});

		var tab2 = Titanium.UI.createTab({
			window : baseWinTab2
		});

		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);

		tabGroup.open();

		//CUSTOM TAB
		Ti.include("customTabBar/customTabBar.js");

		var myCustomTabBar = new CustomTabBar({
			tabBar : tabGroup,
			imagePath : '/images/',
			width : 160,
			height : 40,
			items : [{
				image : 'btn_concerten.png',
				selected : 'btn_concerten_selected.png'
			}, {
				image : 'btn_nieuws.png',
				selected : 'btn_nieuws_selected.png'
			}]
		});

		//return tabGroup;
	}
})();
