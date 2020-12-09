// Color input to text box
$('input[type="color"]').change(function() {
	var color = $(this).val();
	$(this).parent().parent().find('.color-text').val(color.toUpperCase());
	$(this).parent().css({
		'background': color,
		'color': invert(color, true)
	});
});



// When typing color
$('.color-text').on('input', function() {
	let color = tinycolor($(this).val()).toHexString();
	$(this).parent().find('.color-preview').css({
		'background': color,
		'color': invert(color, true)
	});
});



// Show options on click
$('.dropdown-label').on('click', function() {
	$('.option-container').toggle();
});



// Increase/decrease custom stepper
$('.inc').click(function() {
	if ($('.option-field').html() < 50)
		$('.option-field').html(parseInt($('.option-field').html()) + 1);
});
$('.dec').click(function() {
	if ($('.option-field').html() > 11)
		$('.option-field').html(parseInt($('.option-field').html()) - 1);
});



// Edit blend steps on midpoint select
$('.option').click(function() {
	let midpointSelect = $(this).html(),
		stepHtml = $('.blend-step').prop('outerHTML');
	$('.selected-midpoints').html(midpointSelect);
	$('.option-container').hide();
	$('.blend-step').remove();
	$('.blend-container').append(stepHtml.repeat(parseInt(midpointSelect) + 2));
	reset();
});



// Reverse color order
$('.reverse-button').click(function() {
	$('.blend-step').each(function() {
		$(this).parent().prepend(this);
	});
});



// Mix two colors based on weight
function mix(color1, color2, weight) {
	function h2d(e) {return parseInt(e, 16)};
	function d2h(e) {return ('0' + Math.round(e).toString(16)).slice(-2)};
	var divisor = weight / 100;
	var color = '#';
	for (var i = 0; i <= 5; i += 2) {
		let v1 = h2d(color1.substr(i, 2)),
			v2 = h2d(color2.substr(i, 2)),
			vv = d2h(v2 + (v1 - v2) * divisor).toUpperCase();
		color += vv;
	};
	return color;
};



// 3 hex to 6 hex
function hexElongate(hex) {
	if (hex.length == 3) {
		let r = hex.substr(0, 1).toString(),
			g = hex.substr(1, 1).toString(),
			b = hex.substr(2, 1).toString();
		hex = r + r + g + g + b + b;
	}
	return hex;
};



// Blend function
function mainFunction() {
	// Acquire color text from inputs
	let colorInput1 = tinycolor(hexElongate($('#color1').val().replace('#', ''))).toHexString().replace('#', ''),
		colorInput2 = tinycolor(hexElongate($('#color2').val().replace('#', ''))).toHexString().replace('#', '');

	// Calculate blend steps and display visuals/spaces
	$('.blend-step').each(function() {
		let stepAmount = $('.blend-step').length - 1,
			stepCounter = stepAmount - $(this).index(),
			stepMultiplier = 100 / stepAmount,
			stepWeight = stepCounter * stepMultiplier,
			stepHex = mix(colorInput1, colorInput2, stepWeight),
			stepRgb = tinycolor(stepHex).toRgbString(),
			stepHsl = tinycolor(stepHex).toHslString();
		$(this).find('.step-color').css('background', stepHex);
		$(this).find('.step-hex').html(stepHex);
		$(this).find('.step-rgb').html(stepRgb);
		$(this).find('.step-hsl').html(stepHsl);
	});

	// Enable copy on click
	$('td').not('.header-col, .step-color').addClass('copy');

	// Failsafe
	if ($('.step-hex').html().includes('N')) reset();
}



// Reset function
function reset() {
	$('td').not('.header-col').empty().removeClass('copy');
	$('.step-color').css('background', '#eee');
}



// Close dropdown on click elsewhere
$(document).click(function(e) {
	if (!$(e.target).closest('.dropdown').length) $('.option-container').hide();
});