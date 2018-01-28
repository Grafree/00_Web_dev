// JavaScript Document
var imgFileName = null;

$(document).ready(function(e) {
    $('article figure a img').hover(function(){
		var src = $(this).attr('src');
		var path = src.split('/');
		var filename = path[(path.length - 1)];
		var file = filename.split('.');
		imgFileName = file[0];
		$(this).attr('src', 'images/' + imgFileName + '-scroll.jpg');
	},function(){
		$(this).attr('src', 'images/' + imgFileName + '.jpg');
	});
});