import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './DataExport.css';
import {
	getName,
	getWidth,
	getHeight,
	getCharactersWithPixels,
} from '../../../reducers/font';
import { fontToText } from '../../../lib/fontConverter';

export function DataExport({
	output = '',
}) {
	return <textarea className="data-export" value={output} />;
}

export function mapStateToProps(state) {
	const name = getName(state);
	const width = getWidth(state);
	const height = getHeight(state);
	const characters = getCharactersWithPixels(state);

	const output = fontToText({
		name,
		width,
		height,
		characters,
	});

	return {
		output
	};
}

export default connect(mapStateToProps)(DataExport);
