$('#upload-pic').change(function() {
	let src = URL.createObjectURL(event.target.files[0]);
	$('.output').attr('src', src);
});

$('.output').on('mousemove', function(e) {
	$('.acab').css('top', e.pageY);
	$('.acab').css('left', e.pageX);
});