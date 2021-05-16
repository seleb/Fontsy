/* @jsx h */
import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { textToFont } from '../../lib/fontConverter';
import { imageToFont } from '../../lib/imageConverter';
import { mergeFont as actionMergeFont, setFont as actionSetFont } from '../../reducers/font';
import './Import.css';

export function Import() {
	const dispatch = useDispatch();
	const setFont = useCallback((...args) => dispatch(actionSetFont(...args)));
	const mergeFont = useCallback((...args) => dispatch(actionMergeFont(...args)));
	const [merge, setMerge] = useState(false);
	const onChange = useCallback(({
		currentTarget: {
			files: {
				0: file,
			} = [],
		} = {}
	}) => {
		if (!file) {
			return;
		}

		const reader = new FileReader();

		reader.onload = ({
			target: {
				result = '',
			} = {},
		}) => {
			let getFont;
			if (file.type === 'image/png') {
				getFont = () => imageToFont(result).then(result => ({
					...result,
					name: file.name.split(/(\.bitsyfont)?\.png/)[0],
				})).catch(err => {
					window.alert('Failed to import image; see console for details.');
					throw err;
				});
			} else if (file.name.toLowerCase().endsWith('.bitsyfont')) {
				getFont = () => Promise.resolve(textToFont(atob(result.match(/.*base64,([^]+)/)[1])));
			} else {
				throw new Error('Unsupported file type');
			}
			getFont().then(merge ? mergeFont : setFont);
		};

		reader.readAsDataURL(file);
	}, []);
	const setModeMerge = useCallback(() => setMerge(true), []);
	const setModeReplace = useCallback(() => setMerge(false), []);
	return (
		<div className="import">
			<label for="file">File: </label>
			<input className="file-input" type="file" name="file" accept=".png, .bitsyfont" onChange={onChange} />
			<label for="mode">Mode: </label>
			<label for="merge" onClick={setModeMerge} title="Overwrites existing characters in both fonts; leaves characters only in first font intact">
				Merge
				<input type="radio" radioGroup="mode" name="merge" value="merge" checked={merge} />
			</label>
			<label for="replace" onClick={setModeReplace} title="Removes all existing characters">
				Replace
				<input type="radio" radioGroup="mode" name="replace" value="replace" checked={!merge} />
			</label>
		</div>
	);
}

export default Import;
