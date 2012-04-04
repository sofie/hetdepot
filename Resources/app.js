var Uit = {
    ui: {},
    api_key : '147c56bc-ae80-4b2f-b246-b83e55f364fc',
	organizer : '061C13AC-A15F-F419-D8993D68C9E94548'
};


Titanium.UI.setBackgroundImage('img/bg.png');

Titanium.include('styles/font_styles.js');
var commonStyle = require('styles/common_styles').commonStyles();

Titanium.include('config.js');

//windows & ui
Ti.include(
	'windows/lijst.js',
	'windows/nieuws.js',
	
	'windows/detail.js',
	'windows/search.js',
	
	'windows/main.js',
	'windows/activityIndicator.js'
);
Uit.ui.createApplicationMainWin();
