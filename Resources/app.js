var Ti;
Titanium.UI.setBackgroundColor('#f8f8f6');
var commonStyle = require('styles/common_styles').commonStyles();

Ti.include('uit/uit.js');

//windows & ui
Ti.include(
	'windows/lijst.js',
	'windows/detailEvenement.js',
	'windows/aanbevolen.js',
	
	'windows/map.js',
	'windows/settings.js',
	
	'uit/icons.js', 
	'windows/main.js'
);

Uit.ui.createApplicationMainWin();