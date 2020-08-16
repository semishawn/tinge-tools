// Show options on click
$('.selected').on('click', function() {
	$('.option-container').toggle();
});

// Edit blend steps on midpoint select
$('.option').on('click', function() {
	// Remove all current steps and replace with midpoint amount + 2
	var midpointSelect = $(this).html();
	$('.data').html(midpointSelect);
	$('.option-container').hide();
	midpoints = parseInt($(this).html()) + 2;
	$('.blend-container').empty();
	$('.blend-container').append(new Array(++midpoints).join('<tr class="blend-step"><td class="step-color"></td><td class="step-hex"></td><td class="step-rgb"></td><td class="step-hsl"></td></tr>'));

	// Reset assets
	$('.flip-button').addClass('disabled');
	reset();
});