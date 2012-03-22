(function() {
	var iconHeight = 67;
	var iconWidth = 91;

	Uit.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		list : [{
			image : 'img/btn_ontdek.png',
			func : Uit.ui.createLijstWindow
		}, {
			image : 'img/btn_map.png',
			func : Uit.ui.createMapWindow
			
		}, {
			image : 'img/btn_star.png',
			func : Uit.ui.createAanbevolenWindow
		}, {
			image : 'img/btn_settings.png',
			func : Uit.ui.createSettingsWindow
		}]
	};
})();
