(function() {

	Uit.ui.createMapWindow = function() {
		var winkelsWindow = Titanium.UI.createWindow({
			title : 'In de buurt'
		});
		
		var mapview = Titanium.Map.createView({
			left : 30,
			right : 30,
			top : 30,
			bottom : 30,
			mapType : Titanium.Map.STANDARD_TYPE,
			region : {
				latitude : 50.883333,
				longitude : 4.7,
				latitudeDelta : 0.005,
				longitudeDelta : 0.005
			},
			animate : true,
			regionFit : true,
			userLocation : true
		});
		winkelsWindow.add(mapview);


		return winkelsWindow;
	};
})();
