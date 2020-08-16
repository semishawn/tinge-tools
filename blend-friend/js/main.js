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
		colorInput1 = hexElongator(colorInput1.replace('#',''));
		colorInput2 = hexElongator(colorInput2.replace('#',''));
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
	$('td').not('.step-color').addClass('copy');

	// Failsafe
	failsafe();

	// Clean up assets
	reset();
});

// Flip color order
$('.flip-button').click(function() {
	$('.blend-container').toggleClass('flip');
	$('td').not('.step-color').toggleClass('flip');
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

// Reset assets on certain changes
function reset() {
	// Revert flipped containers
	$('.blend-container').removeClass('flip');
	$('td').not('.step-color').removeClass('flip');

	// Resize headers
	$('div.step-hex').width( $('td.step-hex').outerWidth() );
	$('div.step-rgb').width( $('td.step-rgb').outerWidth() );
	$('div.step-hsl').width( $('td.step-hsl').outerWidth() );
};

// Failsafe
function failsafe() {
	if ($('td.step-hsl').html().includes('NaN')) {
		$('td.step-hex').empty();
		$('td.step-rgb').empty();
		$('td.step-hsl').empty();
		$('td').removeClass('copy');
		$('td').css('background-color', '#eee');
	} else {
		$('.flip-button').removeClass('disabled');
	};
};