/*
 * Eerste tab, alle concerten in tableview
 */

(function() {
	Uit.ui.createConcertenWindow = function() {

		Titanium.App.tabgroup.setActiveTab(Titanium.App.navTab1);

		var mainWin = Titanium.UI.createWindow(Uit.combine(style.Window, {
			barImage : 'img/header.png'
		}));
		
		var lblTitle = Titanium.UI.createLabel(Uit.combine(style.titleBar, {
			text : Uit.tab1_name
		}));
		mainWin.setTitleControl(lblTitle);

		// LEFT NAVBAR: SEARCH BUTTON
		var searchButton = Titanium.UI.createButton(style.searchButton);
		searchButton.addEventListener('click', function() {
			var searchWin = Uit.ui.createSearchWindow();
			Titanium.App.navTab1.open(searchWin, {
				animated : false
			});
		});
		mainWin.leftNavButton = searchButton;

		// RIGHT NAVBAR: REFRESH BUTTON
		var refreshButton = Titanium.UI.createButton(style.refreshButton);
		refreshButton.addEventListener('click', function() {
			Uit.ui.activityIndicator.showModal('Loading...', 10000, Uit.app_name + ' timed out. All streams may not have updated.');
			getData();
		});
		mainWin.rightNavButton = refreshButton;

		//GEGEVENS OPHALEN
		mainWin.addEventListener('open', function(e) {
			if(!Titanium.Network.online) {
				alert("You must be connected to the internet to retrieve " + Uit.app_name + " information");
			};
		});
		
		getData();
		//
		// HTTP CLIENT GETCONCERTS
		//
		function getData() {
			var data = [];

			var getReq = Titanium.Network.createHTTPClient();
			var url = 'http://build.uitdatabank.be/api/events/search?format=json&key=' + Uit.api_key + '&organiser=' + Uit.organizer;

			getReq.open("GET", url);
			getReq.timeout = 5000;
			getReq.onload = function() {
				try {
					var list = JSON.parse(this.responseText);

					for(var i = 0, j = list.length; i < j; i++) {

						var cdbId = list[i].cdbid;
						var cdbNaam = list[i].title;
						var cdbDescription = list[i].shortdescription;

						var cdbImg = list[i].thumbnail;
						var strImg = cdbImg.substr(0, 77);
						var imgThumb = strImg + '?width=90&height=90&crop=auto';

						var row = Ti.UI.createTableViewRow(style.tableViewRow);

						if(cdbImg === '') {
							imgThumb = 'img/no_thumb.jpg';
						}

						var image = Titanium.UI.createImageView(Uit.combine(style.Img90,{
							image : imgThumb
						}));

						var name = Ti.UI.createLabel(Uit.combine(style.titleNaam,{
							text : cdbNaam
						}));
						
						var descr = Ti.UI.createLabel(Uit.combine(style.textDescription,{
							text : cdbDescription
						}));

						row.add(image);
						row.add(name);
						row.add(descr);

						data.push(row);
					};

					var tableView = Titanium.UI.createTableView(Uit.combine(style.TableView,{
						data : data
					}));
					mainWin.add(tableView);

					//Open detail window
					tableView.addEventListener('click', function(e) {
						Titanium.App.selectedIndex = list[e.index].cdbid;
						Ti.API.info(Titanium.App.selectedIndex);
						Titanium.App.rowIndex = e.index;

						Titanium.App.navTab1.open(Uit.ui.createConcertDetailWindow(), {
							animated : false
						});
					});
					

					Uit.ui.activityIndicator.hideModal();

				} catch(e) {
					alert(e);
				}
			};

			getReq.onerror = function(e) {
				Ti.API.info("TEXT onerror:   " + this.responseText);
				alert('Kan gegevens niet ophalen.');
				Uit.ui.activityIndicator.hideModal();
			};

			getReq.send();
		};

		return mainWin;
	};
})();
