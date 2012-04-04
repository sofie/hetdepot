(function() {

	Uit.ui.createNieuwsWindow = function() {
		//
		// Main window
		//
		var nieuwsWindow = Titanium.UI.createWindow({
			width : '100%',
			barImage : 'img/header.png',
			tabBarHidden : true,
			backgroundImage:'img/bg.png'
		});
		
		var lblTitle = Titanium.UI.createLabel({
			text : 'Nieuws',
			color : '#fff',
			font : FontLubalinTitle
		});
		nieuwsWindow.setTitleControl(lblTitle);
		

		var data = [Ti.UI.createTableViewRow({
			title : 'Gitaar on stage',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Design Museum Gent',
			hasChild : true
		}), Ti.UI.createTableViewRow({
			title : 'Wonen in meervoud',
			hasChild : true
		})];

		var tableview = Titanium.UI.createTableView({
			data : data,
			scrollable : false,
			fullscreen : false
		});
		nieuwsWindow.add(tableview);
		
		nieuwsWindow.open();
		return nieuwsWindow;
	};
})();
