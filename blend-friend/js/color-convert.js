// 3 hex to 6 hex
function hexElongator(hex) {
	if (hex.length == 3) {
		let r = hex.substr(0,1).toString(),
			g = hex.substr(1,1).toString(),
			b = hex.substr(2,1).toString();
		hex = r + r + g + g + b + b;
	};
	return hex;
};


// hex to rgb
function hex2rgb(hex) {
	hex = hex.replace('#', '');
	var bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255,
		g = (bigint >> 8) & 255,
		b = bigint & 255;
	return `rgb(${r}, ${g}, ${b})`;
};


// rgb to hex
function rgb2hex(rgb) {
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	rgb = rgb.substr(4).split(")")[0].split(sep);
	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);
	if (r.length == 1) {r = "0" + r};
	if (g.length == 1) {g = "0" + g};
	if (b.length == 1) {b = "0" + b};
	return "#" + r + g + b;
};


// hex to hsl
function hex2hsl(hex) {
	let r = 0, g = 0, b = 0;
	if (hex.length == 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];
	} else if (hex.length == 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	};
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
	s = Math.round(+(s * 100).toFixed(1));
	l = Math.round(+(l * 100).toFixed(1));

	return `hsl(${h}, ${s}%, ${l}%)`;
};


// hsl to hex
function hsl2hex(hsl) {
	hsl = hsl.replace(/[^0-9,]/g, '').split(',');
	let h = (hsl[0] / 360),
		s = (hsl[1] / 100),
		l = (hsl[2] / 100);
	let r, g, b;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = x => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};
	return '#' + toHex(r) + toHex(g) + toHex(b);
};