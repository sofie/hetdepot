(function() {
	var iconHeight = 67;
	var iconWidth = 91;

	Uit.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		list : [{
			image : 'img/icon_ontdek.png',
			func : Uit.ui.createLijstWindow
		}, {
			image : 'img/icon_map.png',
			func : Uit.ui.createMapWindow
			
		}, {
			image : 'img/icon_star.png',
			func : Uit.ui.createAanbevolenWindow
		}, {
			image : 'img/icon_settings.png',
			func : Uit.ui.createSettingsWindow
		}]
	};
})();
