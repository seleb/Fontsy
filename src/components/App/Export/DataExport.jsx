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
	name = '',
	output = '',
}) {
	const title = `${name}.bitsyfont`;
	return (
		<div className="data-export">
			<a download={title} href={`data:text/plain;base64,${btoa(output)}`} title={title}>Download</a>
			<textarea value={output} />
		</div>
	);
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
		name,
		output,
	};
}

export default connect(mapStateToProps)(DataExport);
