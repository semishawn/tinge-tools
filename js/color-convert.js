// 3 hex to 6 hex
function hexElongator(hex) {
	if (hex.length == 3) {
		var r = hex.substr(0,1).toString();
		var g = hex.substr(1,1).toString();
		var b = hex.substr(2,1).toString();
		hex = r + r + g + g + b + b;
	};
	return hex;
};

// hex to rgb
function hex2rgb(hex) {
	hex = hex.replace('#', '');
	var bigint = parseInt(hex, 16);
	var r = (bigint >> 16) & 255;
	var g = (bigint >> 8) & 255;
	var b = bigint & 255;
	return 'rgb(' + r + ", " + g + ", " + b + ')';
};

// hex to hsl
function hex2hsl(hex) {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (hex.length == 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];
	} else if (hex.length == 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) {h = 0}
	else if (cmax == r) {h = ((g - b) / delta) % 6}
	else if (cmax == g) {h = (b - r) / delta + 2}
	else {h = (r - g) / delta + 4};

	h = Math.round(h * 60);

	if (h < 0) {h += 360};

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return "hsl(" + h + ", " + s + "%, " + l + "%)";
};