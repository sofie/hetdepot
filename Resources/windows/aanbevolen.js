(function() {

	Uit.ui.createAanbevolenWindow = function() {
		//
		// Main window
		//
		var mainWindow = Titanium.UI.createWindow({
			fullscreen : false,
			title:'Aanbevolen'
		});
		

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
		mainWindow.add(tableview);
		
		return mainWindow;
	};
})();
