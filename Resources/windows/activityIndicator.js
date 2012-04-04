Uit.ui.activityIndicator = (function() {
	var activityIndicator;
	var isShowing = false;
	var myTimeout = undefined;

	var activityIndicator = Ti.UI.createWindow({
		modal : false,
		navBarHidden : true,
		touchEnabled : true
	});
	activityIndicator.orientationModes = [Ti.UI.PORTRAIT];
	var view = Ti.UI.createView({
		backgroundColor : '#000',
		height : '100%',
		width : '100%',
		opacity : 0.6
	});
	var ai = Ti.UI.createActivityIndicator({
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
		color : '#fff',
		font: {
			fontSize : 14, 
			fontFamily : 'Verdana'
		}
	});
	activityIndicator.ai = ai;
	activityIndicator.add(view);
	activityIndicator.add(ai);

	activityIndicator.showModal = function(message, timeout, timeoutMessage) {
		if(isShowing) {
			return;
		}
		isShowing = true;

		activityIndicator.ai.message = message;
		activityIndicator.ai.show();
		activityIndicator.open({
			animated : false
		});

		if(timeout) {
			myTimeout = setTimeout(function() {
				activityIndicator.hideModal();
				if(timeoutMessage) {
					var alertDialog = Ti.UI.createAlertDialog({
						title : 'Update Timeout',
						message : timeoutMessage,
						buttonNames : ['OK']
					});
					alertDialog.show();
				}
			}, timeout);
		}
	};

	activityIndicator.hideModal = function() {
		if(myTimeout !== undefined) {
			clearTimeout(myTimeout);
			myTimeout = undefined;
		}
		if(isShowing) {
			isShowing = false;

			activityIndicator.ai.hide();
			activityIndicator.close({
				animated : false
			});

		}
	}
	return activityIndicator;
})();
