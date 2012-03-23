var Ti;
Titanium.UI.setBackgroundImage('img/bg.png');

Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();

Ti.include('uit/uit.js');

//windows & ui
Ti.include(
	'windows/lijst.js',
	'windows/aanbevolen.js',
	'windows/map.js',
	'windows/settings.js',
	
	'windows/detail.js',
	'windows/search.js',
	
	'uit/icons.js', 
	'windows/main.js'
);

Uit.ui.createApplicationMainWin();