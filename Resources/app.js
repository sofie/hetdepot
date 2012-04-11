var Uit = {
	ui : {},
	api_key : '147c56bc-ae80-4b2f-b246-b83e55f364fc',
	organizer : '061C13AC-A15F-F419-D8993D68C9E94548',

	url_news_feed : 'http://www.demorgen.be/cache/rss_muziek.xml',
	app_name : 'Het Depot',
	app_site : 'http://www.hetdepot.be/',

	tab1_name : 'Concerten',
	tab2_name : 'Nieuws',

	//Tabgroup
	customTab1 : 'btn_concerten.png',
	customTab1_selected : 'btn_concerten_selected.png',
	customTab2 : 'btn_nieuws.png',
	customTab2_selected : 'btn_nieuws_selected.png',
};

Ti.include(
	'windows/concerten.js', 
	'windows/nieuws.js', 
	'windows/concert_detail.js', 
	'windows/nieuws_detail.js', 
	'windows/zoeken.js', 
	'windows/main.js', 
	
	'config/config.js', 
	'config/activityIndicator.js', 
	 
	'styles/styles.js');
	
Uit.ui.createApplicationMainWin();
