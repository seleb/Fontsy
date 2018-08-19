import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { imageToFont } from '../../../lib/imageConverter';
import { textToFont } from '../../../lib/fontConverter';

import {
	setWidth,
	setHeight,
	addCharacters,
	setPixels,
	setName,
	removeAllCharacters,
} from '../../../reducers/font';

import './ImportFont.css';

export class ImportFont extends Component {
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
			this.props.removeAllCharacters();
			let getFont;
			if (file.type === 'image/png') {
				getFont = ()=>imageToFont(result).then(result => ({
					...result,
					name: file.name.split(/(\.bitsyfont)?\.png/)[0],
				}));
			} else if (file.name.toLowerCase().endsWith('.bitsyfont')) {
				getFont = ()=>Promise.resolve(textToFont(atob(result.substr(13))));
			} else {
				throw new Error('Unsupported file type');
			}
			getFont().then(font => {
				this.props.setName(font.name);
				this.props.setWidth(font.width);
				this.props.setHeight(font.height);
				this.props.setPixels(font.pixels);
			});
		};

		reader.readAsDataURL(file);
	}

	render({
		src = '',
		width = 0,
		height = 0,
	}) {
		return <input type="file" name="file" accept=".png, .bitsyfont" onChange={this.onChange} />
		// return <button onClick={this.import}>import</button>;
	}
}

export const mapDispatchToProps = {
	setWidth,
	setHeight,
	addCharacters,
	setPixels,
	setName,
	removeAllCharacters,
}

export default connect(undefined, mapDispatchToProps)(ImportFont);
