// Repeat string function
String.prototype.repeat = function(amount) {
	return new Array(amount + 1).join(this);
}



// Copy on click
$(document).on('click', '.copy', function () {
	var copyInput = $('<input>');
	$('body').append(copyInput);
	copyInput.val($(this).html()).select();
	document.execCommand('copy');
	copyInput.remove();

	var copyBox = $('<div class="copy-box"><i class="far fa-copy"></i>Copied to clipboard!</div>');
	copyBox.appendTo($('body')).animate({'right': '0'}, 200);
	var copyWidth = parseInt( $('.copy-box').css('--copy-width') );
	var copyMargin = parseInt( $('.copy-box').css('--copy-margin') );
	var pullBack = -1 * (copyWidth + 2 * copyMargin);
	copyBox.delay(2000).animate({'right': pullBack}, 200);
});



// Generation button animation cuz I can't do it in css for some reason
$('.function-button').children().hover(function(e) { 
	$(this).parent().children().css('background', e.type === 'mouseenter' ? 'var(--input-hover)': 'white');
	$(this).parent().css('transform', e.type === 'mouseenter' ? 'scale(1.05)': 'scale(1)');
});

$('.function-button').children().click(function() {
	mainFunction();
});