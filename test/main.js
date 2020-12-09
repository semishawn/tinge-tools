$('button').click(function() {
	var color = tinycolor($('input').val());
	alert(color.toRgbString());
});