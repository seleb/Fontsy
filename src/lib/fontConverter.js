// helpers for saving/loading bitsyfonts

export function textToFont(sourceText) {
	const lines = sourceText.trim().split('\n');

	// get name
	const name = lines[0].split('FONT ')[1];

	// get width/height
	const { 1: width = 0, 2: height = 0 } = lines[1].split(' ').map((s) => parseInt(s, 10));

	// get characters/pixels
	const characters = [];
	const pixels = [];
	for (let i = 2; i < lines.length; i += height + 1) {
		const character = lines[i].split('CHAR ')[1];
		characters.push(character);
		for (let row = 0; row < height; ++row) {
			for (let col = 0; col < width; ++col) {
				pixels.push({
					character,
					x: col,
					y: row,
					value: lines[i + row + 1][col] === '1',
				});
			}
		}
	}

	return {
		name,
		width,
		height,
		characters,
		pixels,
	};
}

export function fontToText({ name = '', width = 0, height = 0, characters = [] }) {
	return `FONT ${name}
SIZE ${width} ${height}
${characters
	.map(
		({ character = '', pixels = [] }) => `CHAR ${character}
${pixels.map((row) => row.map((pixel) => (pixel ? '1' : '0')).join('')).join('\n')}`
	)
	.join('\n')}`;
}
