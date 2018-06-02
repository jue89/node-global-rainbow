// Convert HSL tupel to RGB tupel
const hsl2rgb = (hue, saturation, lightness) => {
	const chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
	const huePrime = hue / 60;
	const huePrimeFloor = Math.floor(huePrime);
	const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

	let red;
	let green;
	let blue;

	if (huePrimeFloor === 0) {
		red = chroma;
		green = secondComponent;
		blue = 0;
	} else if (huePrimeFloor === 1) {
		red = secondComponent;
		green = chroma;
		blue = 0;
	} else if (huePrimeFloor === 2) {
		red = 0;
		green = chroma;
		blue = secondComponent;
	} else if (huePrimeFloor === 3) {
		red = 0;
		green = secondComponent;
		blue = chroma;
	} else if (huePrimeFloor === 4) {
		red = secondComponent;
		green = 0;
		blue = chroma;
	} else if (huePrimeFloor === 5) {
		red = chroma;
		green = 0;
		blue = secondComponent;
	}

	const lightnessAdjustment = lightness - (chroma / 2);
	red += lightnessAdjustment;
	green += lightnessAdjustment;
	blue += lightnessAdjustment;

	return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
};

// Create a sequence: 0..length-1
const seq = (length) => Array.apply(null, {length}).map(Function.call, Number);

// Precalculate a lookup table
const lut = seq(360).map((hue) => hsl2rgb(hue, 1, 0.5));

function GlobalRainbow(speed) {
	this.speed = speed || 30;
}

GlobalRainbow.prototype.get = function (offsets) {
	if (offsets === undefined) offsets = [ 0 ];
	if (typeof offsets === 'number') offsets = [ offsets ];

	// Get colors by date and offsets
	const base = Math.round(Date.now() / 1000 * this.speed);
	const colors = offsets.map((o) => lut[(base + o) % lut.length]);

	// Return requested colors
	return (colors.length === 1) ? colors[0] : colors;
};

module.exports = GlobalRainbow;
