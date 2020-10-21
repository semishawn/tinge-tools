// Disable spell check
$('.color-text').attr('spellcheck', false);

// Color type to placeholder
$('.color-format input').on('change', function() {
	colorType = $("label[for='" + $(this).attr('id') + "']").html()
	$('.color-text1').attr('placeholder', colorType + ' Color 1');
	$('.color-text2').attr('placeholder', colorType + ' Color 2');
});

// Color input to text box
$('input[type="color"]').each(function() {
	$(this).on('input', function() {
		var color = $(this).val();
		$(this).closest('.color-select').find('.color-text').val(color);
		$(this).closest('.color-select').find('.color-preview').css('background-color', color);
		allowBlend();
	});
});

// Preview color from text box
$('.color-text').each(function() {
	$(this).on('input', function() {
		var color = $(this).val();
		if ($('#hex-format').is(':checked') && color.indexOf('#') !== 0) {color = '#' + color};
		$(this).closest('.color-select').find('.color-preview').css('background-color', color);
		allowBlend();
	});
});

// Check if both text boxes have value before allowing to blend
function allowBlend() {
	if ($('.color-text1').val() && $('.color-text2').val()) {
		$('.blend-button').removeClass('disabled');
	} else {
		$('.blend-button').addClass('disabled');
	};
};