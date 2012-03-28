var Uit = {
    ui: {},
    navGroup: undefined
};


Titanium.UI.setBackgroundImage('img/bg.png');

Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();


//windows & ui
Ti.include(
	'windows/lijst.js',
	'windows/nieuws.js',
	
	'windows/detail.js',
	'windows/search.js',
	
	'windows/icons.js', 
	'windows/main.js'
);

Uit.ui.createApplicationMainWin();