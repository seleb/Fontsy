import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { imageToFont } from '../../lib/imageConverter';
import { textToFont } from '../../lib/fontConverter';

import {
	setFont,
	mergeFont,
} from '../../reducers/font';

import './Import.css';

export class Import extends Component {
	constructor() {
		super();
		this.state = {
			merge: false,
		};
	}

	onChange = ({
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
					console.log('If you are using Firefox, make sure to remove any colour profiles before trying to import an image.');
					window.alert('Failed to import image; see console for details.');
					throw err;
				});
			} else if (file.name.toLowerCase().endsWith('.bitsyfont')) {
				getFont = () => Promise.resolve(textToFont(atob(result.match(/.*base64,([^]+)/)[1])));
			} else {
				throw new Error('Unsupported file type');
			}
			getFont().then(this.state.merge ? this.props.mergeFont : this.props.setFont);
		};

		reader.readAsDataURL(file);
	}

	setModeMerge = () => {
		this.setState({
			merge: true,
		})
	}

	setModeReplace = () => {
		this.setState({
			merge: false,
		})
	}

	render({
		src = '',
		width = 0,
		height = 0,
	}, {
		merge = false,
	}) {
		return (
			<div className="import">
				<label for="file">File: </label>
				<input className="file-input" type="file" name="file" accept=".png, .bitsyfont" onChange={this.onChange} />
				<label for="mode">Mode: </label>
				<label for="merge" onClick={this.setModeMerge} title="Overwrites existing characters in both fonts; leaves characters only in first font intact">
					Merge
					<input type="radio" radioGroup="mode" name="merge" value="merge" checked={merge} />
				</label>
				<label for="replace" onClick={this.setModeReplace} title="Removes all existing characters">
					Replace
					<input type="radio" radioGroup="mode" name="replace" value="replace" checked={!merge} />
				</label>
			</div>
		);
	}
}

export const mapDispatchToProps = {
	setFont,
	mergeFont,
}

export default connect(undefined, mapDispatchToProps)(Import);
