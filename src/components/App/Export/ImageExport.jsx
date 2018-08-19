import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { fontToImage } from '../../../lib/imageConverter';

import {
	getWidth,
	getHeight,
	getName,
	getCharactersWithPixels,
} from '../../../reducers/font';

import './ImageExport.css';

export function ImageExport({
	src = '',
	name = '',
	width = 0,
	height = 0,
}) {
	const title = `${name}.bitsyfont.png`
	return <div className="image-export">
		<a download={title} href={src} title={title}>
			<img src={src} width={width} height={height} alt={title} title={title} />
		</a>
	</div>;
}

export function mapStateToProps(state) {
	
	const width = getWidth(state);
	const height = getHeight(state);
	const characters = getCharactersWithPixels(state);

	return {
		...fontToImage({
			width,
			height,
			characters,
		}),
		name: getName(state),
	};
}

export default connect(mapStateToProps)(ImageExport);
