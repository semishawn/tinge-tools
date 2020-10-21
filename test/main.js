// RGB to RYB
function rgb2ryb(color) {
	color = color.replace(/[^0-9,]/g, '').split(',');
	var r = color[0], g = color[1], b = color[2];
	var w = Math.min(r, g, b);
	r -= w;
	g -= w;
	b -= w;
	var mg = Math.max(r, g, b);
	var y = Math.min(r, g);
	r -= y;
	g -= y;
	if (b && g) {
		b /= 2.0;
		g /= 2.0;
	}
	y += g;
	b += g;
	var my = Math.max(r, y, b);
	if (my) {
		var n = mg / my;
		r *= n;
		y *= n;
		b *= n;
	}
	r += w;
	y += w;
	b += w;
	return `ryb(${r}, ${y}, ${b})`;
}

// RYB to RGB
function ryb2rgb(color) {
	color = color.replace(/[^0-9,]/g, '').split(',');
	var r = color[0], y = color[1], b = color[2];
	var w = Math.min(r, y, b);
	r -= w;
	y -= w;
	b -= w;
	var my = Math.max(r, y, b);
	var g = Math.min(y, b);
	y -= g;
	b -= g;
	if (b && g) {
		b *= 2.0;
		g *= 2.0;
	}
	r += y;
	g += y;
	var mg = Math.max(r, g, b);
	if (mg) {
		var n = my / mg;
		r *= n;
		g *= n;
		b *= n;
	}
	r += w;
	g += w;
	b += w;
	return `rgb(${r}, ${g}, ${b})`;
}

// RYB color mixer
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

var poopoo = '#ffff00';
	poopoo = hex2rgb(poopoo);
	poopoo = rgb2ryb(poopoo);
	poopoo = rgb2hex(poopoo).replace('#', '');
var peepee = '#0000ff';
	peepee = hex2rgb(peepee);
	peepee = rgb2ryb(peepee);
	peepee = rgb2hex(peepee).replace('#', '');

var mixed = mix(poopoo, peepee, 50);
	mixed = hex2rgb(mixed);
	mixed = ryb2rgb(mixed);

$('.color1').html(poopoo).css('background', poopoo);
$('.color2').html(peepee).css('background', peepee);
$('.output').html(mixed).css('background', mixed);