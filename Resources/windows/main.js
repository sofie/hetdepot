//Window met 4 buttons

(function() {

	Uit.ui.createApplicationMainWin = function() {

	var tabGroup = Titanium.UI.createTabGroup();

		// First tab, main window
		var mainWinTab1 = Uit.ui.createLijstWindow();

		var searchButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_search.png",
			width : 50,
			height : 33
		});
		mainWinTab1.rightNavButton = searchButton;
		
		var refreshButton = Titanium.UI.createButton({
			backgroundImage : "img/btn_refresh.png",
			width : 50,
			height : 33
		});
		refreshButton.addEventListener('click', function() {
			Ti.App.fireEvent('app:reloadRequest', {
				action : 'Reload request'
			});
		});
		mainWinTab1.leftNavButton=refreshButton;

		

		var navTab1 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab1
		});
		Titanium.App.navTab1 = navTab1;

		searchButton.addEventListener('click', function() {
			var searchWinTab1 = Uit.ui.createSearchWindow();
			navTab1.open(searchWinTab1,{animated:false});
		});

		var baseWinTab1 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden:true
		});
		baseWinTab1.add(navTab1);

		
		// Second tab, main window

		var mainWinTab2 = Uit.ui.createNieuwsWindow();

		var navTab2 = Titanium.UI.iPhone.createNavigationGroup({
			window : mainWinTab2
		});
		Titanium.App.navTab2 = navTab2;

		var baseWinTab2 = Titanium.UI.createWindow({
			navBarHidden : true,
			tabBarHidden:true
		});
		baseWinTab2.add(navTab2);

		// Tab group

		var tab1 = Titanium.UI.createTab({
			window : baseWinTab1
		});

		var tab2 = Titanium.UI.createTab({
			window : baseWinTab2
		});

		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);

		tabGroup.open();
		
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
		
		return tabGroup;
	}
})();
