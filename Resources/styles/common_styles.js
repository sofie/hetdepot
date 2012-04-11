exports.commonStyles = function() {
	return {
		window : {
			width : '100%',
			backgroundImage : 'img/bg.png',
			tabBarHidden : true
		},
		tableViewRow :{
			rightImage : 'img/arrow.png',
			backgroundImage : 'img/bg.png',
			layout : 'vertical',
			selectedBackgroundColor : '#B8DAE8'
		},

		//BUTTONS
		backButton : {
			backgroundImage : "img/btn_back.png",
			width : 50,
			height : 44
		},
		downButton : {
			backgroundImage : "img/btn_down.png",
			width : 50,
			height : 44
		},
		searchButton : {
			backgroundImage : "img/btn_search.png",
			width : 50,
			height : 44
		},
		refreshButton : {
			backgroundImage : "img/btn_refresh.png",
			width : 50,
			height : 44
		},
		
		//LABELS
		
		titleBarLabel : {
			color : '#fff',
			font : {
				fontSize : 22,
				fontFamily : 'LubalinGraph LT'
			}
		},
		//BACKGROUNDS
		starView : {
			backgroundImage : "img/star.png",
			width : 14,
			height : 14
		}
	};
};
