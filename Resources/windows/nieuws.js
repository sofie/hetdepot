/*
 * Tweede tab, rss/nieuws
 */

(function() {
	Uit.ui.createNieuwsWindow = function() {

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

		Titanium.include('windows/strip_tags.js');

		var data;
		var i = 0;
		var feedTableView;
		var feedTitle = '';

		function displayItems(itemList) {

			for(var c = 0; c < itemList.length; c++) {

				var title = itemList.item(c).getElementsByTagName("title").item(0).text;
				var desc = itemList.item(c).getElementsByTagName("description").item(0).text;
				title = title.replace(/\n/gi, " ");
				desc = desc.replace(/\n/gi, " ");

				// Create a table row for this item
				var row = Ti.UI.createTableViewRow({
					height : 'auto',
					rightImage : 'img/detail.png',
					backgroundImage : 'img/bg.png',
					layout : 'vertical',
					selectedBackgroundColor : '#B8DAE8'
				});

				// Create a label for the title
				var post_title = Ti.UI.createLabel({
					text : title,
					color : '#000',
					textAlign : 'left',
					left : 20,
					height : 20,
					width : 300,
					top : 5,
					font : {
						fontWeight : 'bold',
						fontSize : 15
					}
				});
				row.add(post_title);

				var post_desc = Ti.UI.createLabel({
					text : desc,
					color : '#000',
					textAlign : 'left',
					left : 20,
					height : 50,
					width : 270,
					top : 8,
					font : {
						fontSize : 12
					}
				});
				row.add(post_desc);

				// Add some rowData for when it is clicked
				row.thisTitle = title;
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

				// a feed item was clicked
				Ti.API.info('item index clicked :' + e.index);
				Ti.API.info('title  :' + e.rowData.thisTitle);
				Ti.API.info('description  :' + strip_tags(e.rowData.thisDesc));
			});
		};

		function loadRSSFeed(url) {
			data = [];
			Ti.API.info('>>>> loading feed ' + url);
			xhr = Titanium.Network.createHTTPClient();
			xhr.open('GET', url);
			xhr.onload = function() {
				try {
					Ti.API.info('>>> got the feed! ... ');

					// Now parse the feed XML
					var xml = this.responseXML;

					// Find the channel element
					var channel = xml.documentElement.getElementsByTagName("channel");
					feedTitle = channel.item(0).getElementsByTagName("title").item(0).text;

					Ti.API.info("TITLE " + feedTitle);

					lblTitle.text = feedTitle;
					// Find the RSS feed 'items'
					var itemList = xml.documentElement.getElementsByTagName("item");
					Ti.API.info('found ' + itemList.length + ' items in the RSS feed');

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
