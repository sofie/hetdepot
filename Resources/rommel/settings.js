(function() {
	Uit.ui.createSettingsWindow = function() {
		var mainWin = Titanium.UI.createWindow({
			title:'Instellingen'
		});
		
		var lblWaar = Titanium.UI.createLabel({
			text:'Waar',
			height:'auto',
			top:20,
			width:150,
			left:20
		});
		mainWin.add(lblWaar);
	
		return mainWin;
	};
})();
