/* @jsx h */
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { fontToText } from '../../../lib/fontConverter';
import { getCharactersWithPixels, getHeight, getName, getWidth } from '../../../reducers/font';
import './DataExport.css';

export function DataExport() {
	const name = useSelector(getName);
	const width = useSelector(getWidth);
	const height = useSelector(getHeight);
	const characters = useSelector(getCharactersWithPixels);

	const output = useMemo(
		() =>
			fontToText({
				name,
				width,
				height,
				characters,
			}),
		[name, width, height, characters]
	);
	const title = `${name}.bitsyfont`;
	return (
		<div className="data-export">
			<a download={title} href={`data:text/plain;base64,${btoa(output)}`} title={title}>
				Download
			</a>
			<textarea value={output} />
		</div>
	);
}

export default DataExport;
