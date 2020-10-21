// Mix two colors based on weight
function mix(color1, color2, weight) {
	function h2d(e) {return parseInt(e, 16)};
	function d2h(e) {return ('0' + Math.round(e).toString(16)).slice(-2)};
	var divisor = weight / 100;
	var color = '#';
	for (var i = 0; i <= 5; i += 2) {
		let v1 = h2d(color1.substr(i, 2)),
			v2 = h2d(color2.substr(i, 2));
		vv = d2h(v2 + (v1 - v2) * divisor).toUpperCase();
		color += vv;
	};
	return color;
};

// Blend function
$('.blend-button').on('click', function blend() {
	// Acquire color text from inputs
	var colorInput1 = $('.color-text1').val();
	var colorInput2 = $('.color-text2').val();

	// Which format is selected
	if ($('#hex-format').is(':checked')) {
		colorInput1 = hexElongate(colorInput1.replace('#',''));
		colorInput2 = hexElongate(colorInput2.replace('#',''));
	}
	else if ($('#rgb-format').is(':checked')) {
		colorInput1 = rgb2hex(colorInput1).replace('#','');
		colorInput2 = rgb2hex(colorInput2).replace('#','');
	}
	else if ($('#hsl-format').is(':checked')) {
		colorInput1 = hsl2hex(colorInput1).replace('#','');
		colorInput2 = hsl2hex(colorInput2).replace('#','');
	};

	// Calculate blend steps and display visuals/formats
	var stepAmount = $('.blend-step').length - 1;
	$('.blend-step').each(function() {
		let stepCounter = stepAmount - $(this).index(),
			stepMultiplier = 100 / stepAmount,
			stepWeight = stepCounter * stepMultiplier,
			stepHex = mix(colorInput1, colorInput2, stepWeight),
			stepRgb = hex2rgb(stepHex),
			stepHsl = hex2hsl(stepHex);
		$(this).find('.step-color').css('background-color', stepHex);
		$(this).find('.step-hex').html(stepHex);
		$(this).find('.step-rgb').html(stepRgb);
		$(this).find('.step-hsl').html(stepHsl);
	});

	// Enable copy on click
	$('td').not('.header-col, .step-color').addClass('copy');

	// Failsafe
	failsafe();
});

// Reverse color order
$('.reverse-button').click(function() {
	$('tr').each(function() {
		$(this).parent().prepend(this);
	});
});

// Copy on click
$(document).on('click', '.copy', function () {
	var copyInput = $("<input>");
	$("body").append(copyInput);
	copyInput.val($(this).html()).select();
	document.execCommand("copy");
	copyInput.remove();

	var copyBox = $('<div class="copy-box"><i class="far fa-copy"></i>Copied to clipboard!</div>');
	copyBox.appendTo($('body')).delay(200).animate({'right': '0'}, 400);
	var copyWidth = parseInt( $('.copy-box').css('--copy-width') );
	var copyMargin = parseInt( $('.copy-box').css('--copy-margin') );
	var pullBack = -1 * (copyWidth + 2 * copyMargin);
	copyBox.delay(2000).animate({'right': pullBack}, 400);
});

// Failsafe
function failsafe() {
	if ($('.step-hex').html().includes('N')) {
		$('td').not('.header-col').empty().removeClass('copy');
		$('.step-color').css('background-color', '#eee');
	} else {
		$('.reverse-button').removeClass('disabled');
	};
};