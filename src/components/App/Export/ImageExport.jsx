import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './ImageExport.css';
import {
	getWidth,
	getHeight,
	getCharacters,
	getPixelValue,
} from '../../../reducers/font';

export function ImageExport({
	src = '',
	width = 0,
	height = 0,
}) {
	return <div className="image-export">
		<img src={src} width={width} height={height} />
	</div>;
}

export function mapStateToProps(state) {
	const width = getWidth(state);
	const height = getHeight(state);
	const characters = Object.keys(getCharacters(state));

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	const white = context.createImageData(1, 1);
	white.data[0] = 255;
	white.data[1] = 255;
	white.data[2] = 255;
	white.data[3] = 255;

	const black = context.createImageData(1, 1);
	black.data[0] = 0;
	black.data[1] = 0;
	black.data[2] = 0;
	black.data[3] = 255;

	canvas.width = width;
	canvas.height = characters.length * height;

	characters.forEach((character, idx) => {
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {

				context.putImageData(
					getPixelValue(state, { character, x, y }) ? white : black,
					x,
					y + idx * height
				);
			}
		}
	});

	return {
		src: canvas.toDataURL(),
		width: canvas.width,
		height: canvas.height,
	};
}

export default connect(mapStateToProps)(ImageExport);
