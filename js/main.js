// Mix two colors based on weight
function mix(color1, color2, weight) {
	function h2d(e) {return parseInt(e, 16);}
	function d2h(e) {return ('0' + Math.round(e).toString(16)).slice(-2);}
	var divisor = weight / 100;
	var color = '#';
	for (var i = 0; i <= 5; i += 2) {
		var v1 = h2d(color1.substr(i, 2));
		var v2 = h2d(color2.substr(i, 2));
		vv = d2h(v2 + (v1 - v2) * divisor).toUpperCase();
		color += vv;
	};
	return color;
};

// Blend function
$('.blend-button').on('click', function blend() {
	var colorInput1 = $('.color-text1').val().replace('#', '');
	var colorInput2 = $('.color-text2').val().replace('#', '');
	colorInput1 = hexElongator(colorInput1);
	colorInput2 = hexElongator(colorInput2);

	var stepAmount = $('.blend-step').length - 1;
	$('.blend-step').each(function() {
		var stepCounter = stepAmount - $(this).index();
		var stepMultiplier = 100 / stepAmount;
		var stepWeight = stepCounter * stepMultiplier;
		var stepHex = mix(colorInput1, colorInput2, stepWeight);
		var stepRgb = hex2rgb(stepHex);
		var stepHsl = hex2hsl(stepHex);
		$(this).find('.step-color').css('background-color', stepHex);
		$(this).find('.step-hex').html(stepHex);
		$(this).find('.step-rgb').html(stepRgb);
		$(this).find('.step-hsl').html(stepHsl);
	});

	$('.flip-button').removeClass('disabled');
	$('td').not('.step-color').addClass('copy');

	$('div.step-hex').width( $('td.step-hex').outerWidth() );
	$('div.step-rgb').width( $('td.step-rgb').outerWidth() );
	$('div.step-hsl').width( $('td.step-hsl').outerWidth() );
});

// Flip function
$('.flip-button').click(function() {
	$('.blend-container').toggleClass('flip');
	$('td').not('.step-color').toggleClass('flip');
});