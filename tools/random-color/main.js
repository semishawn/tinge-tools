$(document).ready(function() {
	// Initialize all color profile options
	var hues = ['random', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome'];
	for (let i = 0; i < hues.length; ++i) {
		var hueInput = `
			<input type="radio" name="hue" id="hue-${hues[i]}" autocomplete="off">
			<label class="hue-label" for="hue-${hues[i]}">${capitalize(hues[i])}</label>
		`;
		$('.hue-selector').append(hueInput);
	}
	$('input[name="hue"]').eq(0).prop('checked', true);

	// Initialize all color profile options
	var lumins = ['random', 'light', 'dark'];
	for (let i = 0; i < lumins.length; ++i) {
		var luminInput = `
			<input type="radio" name="lumin" id="lumin-${lumins[i]}" autocomplete="off">
			<label class="lumin-label" for="lumin-${lumins[i]}">${capitalize(lumins[i])}</label>
		`;
		$('.lumin-selector').append(luminInput);
	}
	$('input[name="lumin"]').eq(0).prop('checked', true);

	function capitalize(e) {
		return e.substr(0, 1).toUpperCase() + e.substr(1);
	}

	// Switcher animation thingy
	$('.color-selector').each(function() {
		var labelWidth = $(this).find('label').outerWidth();
		$(this).find('.switcher').width(labelWidth);
	});
	$('input').change(function() {
		var labelPosition = $('label[for="' + $(this).attr('id') + '"]').position();
		$(this).parent().find('.switcher').css({
			'top': labelPosition.top,
			'left': labelPosition.left
		});
	});
});



// Generate on click
function mainFunction() {
	var svg = $('.circle svg');
	svg.removeClass('spin');
	svg.addClass('spin');

	var luminy = $('input[name="lumin"]:checked').attr('id').substring(6);
	var huey = $('input[name="hue"]:checked').attr('id').substring(4);
	var randomHex = randomColor({luminosity: luminy, hue: huey});

	$('.color-box').css('background', randomHex);
	$('.hex-data').html(randomHex.toUpperCase());
	$('.rgb-data').html(tinycolor(randomHex).toRgbString());
	$('.hsl-data').html(tinycolor(randomHex).toHslString());

	$('.color-data').addClass('copy');
}