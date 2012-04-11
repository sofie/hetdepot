(function() {	
	Uit.ui.theme = {
		textColor:'#000000',
		redColor:'#D63F27',
		lightBlue:'#86B6CD',
		font: {
			fontFamily:'Verdana'
		}
	};

	Uit.ui.properties = {
		platformWidth: Ti.Platform.displayCaps.platformWidth,
		platformHeight: Ti.Platform.displayCaps.platformHeight,
		
		Window: {
			width : '100%',
			backgroundImage : 'img/bg.png',
			tabBarHidden : true
		},
		scrollView: {
			contentWidth : 'auto',
			contentHeight : 'auto',
			showVerticalScrollIndicator : true,
			layout : 'vertical',
			top : 0,
			bottom : 10,
		},
		
		//
		// BUTTONS
		//
		backButton: {
			backgroundImage : "img/btn_back.png",
			width : 50,
			height : 44
		},
		searchButton: {
			backgroundImage : "img/btn_search.png",
			width : 50,
			height : 44
		},
		refreshButton: {
			backgroundImage : "img/btn_refresh.png",
			width : 50,
			height : 44
		},
		prevButton:{
			backgroundImage:'img/prev.png',
			height:14,
			width:14,
			left:20
		},
		nextButton:{
			backgroundImage:'img/next.png',
			height:14,
			width:14,
			right:20
		},
		
		//
		//IMAGEVIEWS
		//
		Img90: {
			backgroundColor : '#000',
			width : 90,
			height : 90,
			left : 0,
			top : 0,
			bottom:3
		},
		Img320: {
			width : Ti.Platform.displayCaps.platformWidth,
			height : 175,
			top:0,
			left:0
		},
		
		SearchField: {
			color : '#b3b3b3',
			font : {
				fontFamily : 'Tahoma',
				fontSize : 14
			},
			returnKeyType : Titanium.UI.RETURNKEY_SEARCH,
			width : 265,
			height : 30,
			top : 7,
			left : 40,
		},
		
		//
		// VIEWS
		//
		TableView: {
			top : 0,
			left : 0,
			right : 0,
			bottom : 40,
			backgroundImage : '/img/bg.png'
		},
		tableViewRow :{
			rightImage : 'img/arrow.png',
			backgroundImage : 'img/bg.png',
			layout : 'vertical',
			selectedBackgroundColor : '#B8DAE8',
			backgroundSelectedColor: '#B8DAE8',
			height:'auto'
		},
		searchBar:{
			backgroundImage : 'img/bg_search.png',
			width : Ti.Platform.displayCaps.platformWidth,
			height : 43,
			top : 0,
			left : 0
		},
		toolBar: {
			width:Ti.Platform.displayCaps.platformWidth,
			height:25,
			top:0,
			backgroundImage:'img/toolbar_gradient.png'
		},
		viewBlue :{
			width : '100%',
			backgroundColor : '#86B6CD',
			height : 30,
			top : 0,
			right : 0
		},
		starView1 : {
			backgroundImage : "img/star.png",
			width : 14,
			height : 14,
			left:110
		},
		starView2 : {
			backgroundImage : "img/star.png",
			width : 14,
			height : 14,
			left:200
		},
		footerView:{
			backgroundColor:'#361C00',
			height:40,
			left:10,
			right:10,
			top:-15,
			bottom:40
		},
		webViewDescription:{
			backgroundColor : 'transparent',
			touchEnabled:false,
			width : 270,
			height : 'auto',
			top : 5
		},
		webViewFeed:{
			width : 440,
			left : 0,
			top : 25,
			bottom : 40
		},
		orangeArrow:{
			backgroundImage:'/img/bg-red-circle.png',
			width:12,
			height:12,
			top:5,
			left:30
		},
		horizontalView:{
			width : '100%',
			height : 30,
			top : 10
		},
		
		//
		// LABELS
		//
		titleBar: {
			color : '#fff',
			font : {
				fontSize : 22,
				fontFamily : 'LubalinGraph LT'
			}
		},
		
		//TAB1
		titleSmall: {
			left : 100,
			top : -95,
			width : 'auto',
			height : 50,
			textAlign : 'left',
			font : {
				fontFamily : 'Impact', fontSize:18
			}
		},
		titleWhite:{
			textAlign : 'left',
			font :{ fontFamily : 'Impact', fontSize: 21},
			color : '#fff',
			width : 300,
			height : 25,
			top : -28,
			left : 10
		},
		textLubalin: {
			textAlign : 'left',
			font : { fontSize : 14, fontFamily : 'LubalinGraph LT' },
			color : '#D63F27',
			width : 'auto',
			height : 'auto',
			left : 30,
			right:'auto'
		},
		textLubalinBrown: {
			textAlign : 'left',
			font : { fontSize : 14, fontFamily : 'LubalinGraph LT' },
			color:'#602210',
			top :-17,
			left : 47,
			bottom:40,
			width : 'auto',
			height : 'auto'
		},
		textSmall:{
			bottom : 5,
			left : 100,
			width : 205,
			height : 36,
			textAlign : 'left',
			font : {fontSize : 11, fontFamily : 'Verdana'}
		},
		textFooter:{
			textAlign : 'left',
			font : {fontSize : 11, fontFamily : 'Verdana'},
			color:'#fff'
		},
		textInstruction:{
			width : 'auto',
			font : {fontSize : 13, fontFamily : 'Verdana'},
			color : '#555',
			left : 20,
			right : 20,
			height : 40,
			top : 60
		},
		
		//TAB2
		titleFeeds:{
			height : 50,
			width : 270,
			left : 20,
			top : 5,
			textAlign : 'left',
			font : {
				fontFamily : 'Impact', 
				fontSize:18
			}
		},
		textFeed:{
			color : '#000',
			textAlign : 'left',
			top : 5,
			left : 20,
			height : 50,
			width : 270,
			font : {fontSize : 11, fontFamily : 'Verdana'}
		},
		feedDate:{
			color : '#000',
			textAlign : 'left',
			font : {fontSize : 11, fontFamily : 'Verdana' ,fontWeight:'bold'},
			height : 'auto',
			width : 270,
			top : 5,
			left : 20,
			bottom : 8
		},
		
		//
		//ACTIVITYINDICATOR
		//
		backgroundView: {
			backgroundColor : '#000',
			height : '100%',
			width : '100%',
			opacity : 0.6
		},
		activityIndicator:{
			style : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			color : '#fff',
			font: {
				fontSize : 14, 
				fontFamily : 'Verdana'
			}
		}
		
	};
})();

//Shortcut for UI properties
var style = Uit.ui.properties;