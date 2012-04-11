/*
 * Tweede tab, rss/nieuws
 */

(function() {
	Uit.ui.createNieuwsWindow = function() {

		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab2);

		var titlebarImg = mergeObjects(commonStyle.window, {
			barImage : 'img/header.png'
		});
		var nieuwsWindow = Titanium.UI.createWindow(titlebarImg);
		
		var lblTitle = mergeObjects(commonStyle.titleBarLabel, {
			text : Uit.tab2_name
		});
		var lblTitle = Titanium.UI.createLabel(lblTitle);
		nieuwsWindow.setTitleControl(lblTitle);

		// load the feed
		nieuwsWindow.addEventListener('open', function(e) {
			loadRSSFeed(url);
		});
		
		// RIGHT NAVBAR REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(commonStyle.refreshButton);
		refreshButton.addEventListener('click', function() {
			Uit.ui.activityIndicator.showModal('Loading...', 10000, Uit.app_name+' timed out. All streams may not have updated.');
			loadRSSFeed(url);
		});
		nieuwsWindow.rightNavButton = refreshButton;

		Titanium.include('/config/strip_tags.js');
		var url = Uit.url_news_feed;

		var data;
		var i = 0;

		function displayNieuws(itemList) {

			if(!Titanium.Network.online) {
				alert("You must be connected to the internet to retrieve "+Uit.app_name+" information");
			}

			for(var c = 0; c < itemList.length; c++) {

				var title = itemList.item(c).getElementsByTagName("title").item(0).text;
				var desc = itemList.item(c).getElementsByTagName("description").item(0).text;
				var date = itemList.item(c).getElementsByTagName("pubDate").item(0).text;
				date = date.substr(5, 11);
				var link = itemList.item(c).getElementsByTagName("link").item(0).text;

				//Clean up characters
				title = title.replace(/\n/gi, " ");
				title = title.replace(/br/gi, "");
				title = title.replace(/>/gi, "");
				title = title.replace(/&eacute;/gi, "é");
				title = title.replace(/&amp;/gi, "&");
				title = title.replace(/&egrave;/gi, "è");
				title = title.replace(/&euml;/gi, "ë");
				desc = desc.replace(/\n/gi, " ");
				desc = desc.replace(/<br /gi, "");
				desc = desc.replace(/>/gi, "");
				desc = desc.replace(/&amp;/gi, "&");
				desc = desc.replace(/&eacute;/gi, "é");
				desc = desc.replace(/&egrave;/gi, "è");
				desc = desc.replace(/&euml;/gi, "ë");

				// Create a table row for this item
				var rowHeight = mergeObjects(commonStyle.tableViewRow, {
					height : 'auto'
				});
				var row = Titanium.UI.createTableViewRow(rowHeight);

				var post_title = Ti.UI.createLabel({
					text : title,
					color : '#000',
					textAlign : 'left',
					font : FontTitleLittle,
					height : 50,
					width : 270,
					left : 20,
					top : 5
				});
				row.add(post_title);

				var post_desc = Ti.UI.createLabel({
					text : desc,
					color : '#000',
					textAlign : 'left',
					font : FontSmall,
					top : 5,
					left : 20,
					height : 50,
					width : 270
				});
				row.add(post_desc);

				var post_date = Ti.UI.createLabel({
					text : date,
					color : '#000',
					textAlign : 'left',
					font : FontSmallBold,
					height : 'auto',
					width : 270,
					top : 5,
					left : 20,
					bottom : 8
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
			var feedTableView = Titanium.UI.createTableView({
				data : data,
				width : 320,
				top : 0,
				bottom : 40,
			});
			nieuwsWindow.add(feedTableView);

			//WEBVIEW OPENEN VAN NIEUWSITEM
			feedTableView.addEventListener('click', function(e) {
				Titanium.App.selectedItemNieuws = e.rowData.thisLink;
				Titanium.App.navTab2.open(Uit.ui.createNieuwsDetailWindow(), {
					animated : false
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

					// Find the RSS feed 'items'
					var itemList = xml.documentElement.getElementsByTagName("item");

					// Now add the items to a tableView
					displayNieuws(itemList);
					Uit.ui.activityIndicator.hideModal();

				} catch(e) {
					alert(e);
				}
			};

			xhr.send();
		};

		return nieuwsWindow;
	};
})();
