// helpers for saving/loading bitsyfonts

export function fontToText({
	name = '',
	width = 0,
	height = 0,
	characters = [],
}) {
	return `FONT ${name}
SIZE ${width} ${height}
${
characters.map(({
	character = '',
	pixels = [],
}) => (`CHAR ${character}
${pixels.map(row=>row.map(pixel=>pixel ? '1': '0').join('')).join('\n')}`)
).join('\n')}`;
}
