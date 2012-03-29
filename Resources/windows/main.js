//Window met 4 buttons

(function() {
	var navWindow;

	Uit.ui.createApplicationMainWin = function() {

		var mainWindow = Ti.UI.createWindow(commonStyle.windowNoLayout);

		var lblTitle = Titanium.UI.createLabel({
			text : 'Het Depot',
			color : '#fff',
			font : FontLubalinTitle
		});
		mainWindow.setTitleControl(lblTitle);
		navWindow = Ti.UI.createWindow();
		Uit.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : mainWindow
		});
		navWindow.add(Uit.navGroup);
		
		//
		//Icons
		//
		var viewIcons = Titanium.UI.createView({
			top : 55,
			height : 180,
			left : 50,
			width : 280,
			layout : 'horizontal'
		});

		mainWindow.add(viewIcons);

		// Create each menu icon and include properties for any windows it opens
		var createIcon = function(icon) {
			var iconWin = undefined;
			var view = Titanium.UI.createView({
				backgroundImage : icon.image,
				top : 25,
				right : 20,
				height : 67,
				width : 91
			});
			view.addEventListener('click', function(e) {
				iconWin = icon.func(icon.args);
				iconWin.orientationModes = [Ti.UI.PORTRAIT];

				//Navbar tonen om terug naar main te gaan
				iconWin.navBarHidden = false;
				Uit.navGroup.open(iconWin, {
					animated : false
				});

				var backButton = Titanium.UI.createButton(commonStyle.backButton);

				backButton.addEventListener('click', function() {
					Uit.navGroup.close(iconWin, {
						animated : false
					});
				});
				iconWin.leftNavButton = backButton;

			});
			return view;
		};
		// Layout dashboard icons
		for( i = 0; i < Uit.ui.icons.list.length; i++) {
			viewIcons.add(createIcon(Uit.ui.icons.list[i]));
		};

		navWindow.open();
		return mainWindow;

/*
var tabGroup = Titanium.UI.createTabGroup();

		var win1 = Uit.ui.createLijstWindow();
		var tab1 = Titanium.UI.createTab({
			window : win1
		});

		var win2 = Uit.ui.createNieuwsWindow();
		var tab2 = Titanium.UI.createTab({
			window : win2
		});

		// Add them to the group
		tabGroup.addTab(tab1);
		tabGroup.addTab(tab2);

		// open tab group
		tabGroup.open();

		// Here is the magic
		Ti.include("customTabBar/customTabBar.js");

		var myCustomTabBar = new CustomTabBar({
			tabBar : tabGroup,
			imagePath : '/images/',
			width : 80,
			height : 40,
			items : [{
				image : 'home.png',
				selected : 'home_over.png'
			}, {
				image : 'cloud.png',
				selected : 'cloud_over.png'
			}]
		});
		return tabGroup;
*/
	}
	
})();
