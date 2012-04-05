/*
 * Tweede tab, rss/nieuws
 */

(function() {
	Uit.ui.createNieuwsWindow = function() {

		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab2);

		var nieuwsWindow = Titanium.UI.createWindow({
			width : '100%',
			barImage : 'img/header.png',
			tabBarHidden : true,
			backgroundImage : 'img/bg.png'
		});
		nieuwsWindow.addEventListener('open', function() {
			Titanium.API.info('Nieuws window opened');
		});
		var lblTitle = Titanium.UI.createLabel({
			text : 'Nieuws',
			color : '#fff',
			font : FontLubalinTitle
		});
		nieuwsWindow.setTitleControl(lblTitle);

		// RIGHT NAVBAR REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(commonStyle.refreshButton);
		refreshButton.addEventListener('click', function() {
			Uit.ui.activityIndicator.showModal('Loading concerts...', 10000, 'Het Depot timed out. All streams may not have updated.');
			loadRSSFeed(url);
		});
		nieuwsWindow.rightNavButton = refreshButton;

		var url = 'http://www.demorgen.be/cache/rss_muziek.xml';

		var data;
		var i = 0;
		var feedTableView;
		var feedTitle = '';

		function displayItems(itemList) {

			for(var c = 0; c < itemList.length; c++) {

				var title = itemList.item(c).getElementsByTagName("title").item(0).text.toUpperCase();
				var desc = itemList.item(c).getElementsByTagName("description").item(0).text;
				var date = itemList.item(c).getElementsByTagName("pubDate").item(0).text;
				date = date.substr(5, 11);
				var link = itemList.item(c).getElementsByTagName("link").item(0).text;

				// Create a table row for this item
				var row = Ti.UI.createTableViewRow({
					height : 'auto',
					rightImage : 'img/detail.png',
					backgroundImage : 'img/bg.png',
					layout : 'vertical',
					selectedBackgroundColor : '#B8DAE8'
				});

				var post_title = Ti.UI.createLabel({
					text : title,
					color : '#000',
					textAlign : 'left',
					left : 20,
					height : 50,
					width : 270,
					top : 5,
					font : FontTitleLittle
				});
				row.add(post_title);

				var post_desc = Ti.UI.createLabel({
					text : desc,
					color : '#000',
					textAlign : 'left',
					left : 20,
					height : 50,
					width : 270,
					top : 5,
					font : FontNormal
				});
				row.add(post_desc);

				var post_date = Ti.UI.createLabel({
					text : date,
					color : '#000',
					textAlign : 'left',
					left : 20,
					height : 'auto',
					width : 270,
					top : 5,
					bottom : 8,
					font : FontSmallBold
				});
				row.add(post_date);

				// Add some rowData for when it is clicked
				row.thisTitle = title;
				row.thisLink = link;
				row.thisDesc = desc;

				// Add the row to the data
				data[i] = row;
				i++;

			};

			// create the table
			feedTableView = Titanium.UI.createTableView({
				data : data,
				top : 0,
				bottom : 40,
				width : 320
			});

			// Add the tableView to the current window
			nieuwsWindow.add(feedTableView);

			// Create tableView row event listener
			feedTableView.addEventListener('click', function(e) {
				var webview = Titanium.UI.createWebView({
					url : e.rowData.thisLink,
					width : 440,
					left : 0,
					top : -30
				});

				var windowLink = Titanium.UI.createWindow(commonStyle.windowNoLayout);
				var lblTitle = Titanium.UI.createLabel({
					text : 'DeMorgen.be',
					color : '#fff',
					font : FontLubalinTitle
				});
				windowLink.setTitleControl(lblTitle);

				var backBtnLinkWindow = Titanium.UI.createButton(commonStyle.downButton);
				backBtnLinkWindow.addEventListener('click', function() {
					windowLink.close({
						animated : false
					});
				});
				windowLink.leftNavButton = backBtnLinkWindow;

				windowLink.add(webview);
				windowLink.open({
					modal : true,
					modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL, 
	    			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_CURRENT_CONTEXT, 
				});
			});
		};

		function loadRSSFeed(url) {
			data = [];

			xhr = Titanium.Network.createHTTPClient();
			xhr.open('GET', url);
			xhr.onload = function() {
				try {
					// Now parse the feed XML
					var xml = this.responseXML;

					// Find the channel element
					var channel = xml.documentElement.getElementsByTagName("channel");
					feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;

					lblTitle.text = feedTitle;

					// Find the RSS feed 'items'
					var itemList = xml.documentElement.getElementsByTagName("item");

					// Now add the items to a tableView
					displayItems(itemList);
					Uit.ui.activityIndicator.hideModal();

				} catch(e) {
					alert(e);
				}
			};

			xhr.send();
		}

		// load the feed
		loadRSSFeed(url);

		return nieuwsWindow;
	};
})();
