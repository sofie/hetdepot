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
			image : 'img/icon_news.png',
			func : Uit.ui.createNieuwsWindow
		}]
	};
})();
