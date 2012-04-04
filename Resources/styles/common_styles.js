exports.commonStyles = function() {
	return {
		window : {
			width : '100%',
			barImage : 'img/header.png',
			layout:'vertical',
			backgroundImage:'img/bg.png',
			tabBarHidden : true
		},
		windowNoLayout : {
			width : '100%',
			barImage : 'img/header.png',
			tabBarHidden : true,
			backgroundImage:'img/bg.png'
		},

		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 50,
			height : 33
		},
		searchButton : {
			backgroundImage : "img/btn_search.png",
			width : 50,
			height : 33
		},
		refreshButton : {
			backgroundImage : "img/btn_refresh.png",
			width : 50,
			height : 33
		},
		starView:{
			backgroundImage : "img/star.png",
			width : 14,
			height : 14
		}
	};
};
