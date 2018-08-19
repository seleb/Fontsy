import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './DataExport.css';
import {
	getCharacters,
	getName,
	getWidth,
	getHeight,
	getPixelValue,
} from '../../../reducers/font';

export function DataExport({
	output = '',
}) {
	return <textarea className="data-export" value={output} />;
}

export function mapStateToProps(state) {
	const name = getName(state);
	const width = getWidth(state);
	const height = getHeight(state);
	const characters = getCharacters(state);
	const output = `
FONT ${name}
SIZE ${width} ${height}
${Object.keys(characters).map(character => {
			const pixels = new Array(height);
			for (let y = 0; y < height; ++y) {
				pixels[y] = [];
				for (let x = 0; x < width; ++x) {
					pixels[y][x] = getPixelValue(state, { character, x, y }) ? '1' : '0';
				}
				pixels[y] = pixels[y].join('');
			}
			return `
CHAR ${character}
${pixels.join('\n')}
`.trim();
		}).join('\n')}
`.trim();
	return {
		output
	};
}

export default connect(mapStateToProps)(DataExport);
