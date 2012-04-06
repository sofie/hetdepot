/**
 * @author Bart Verbruggen
 */

var mergeObjects = function(destination, source) {
	for(var property in source)
	destination[property] = source[property];
	return destination;
}
var createListThumb = function(url, width, height) {
	var items = ['maxwidth', 'maxheight'];

	for(var i in items) {
		var regex = new RegExp("[\\?&]" + items[i] + "=([^&#]*)");
		var qs = regex.exec(url);
		if(qs) {
			if(items[i] == 'maxwidth') {
				url = url.replace('maxwidth', 'width');
				url = url.replace(qs[1], width);
			} else if(items[i] == 'maxheight') {
				url = url.replace('maxheight', 'height');
				url = url.replace(qs[1], height);
			}
		}
	}
	url = url + '&crop=auto';
	return url;
}