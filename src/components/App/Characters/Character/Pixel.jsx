import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { getCharacters, positionToString, setPixel } from "../../../../reducers/font";

import './Pixel.css';

export class Pixel {
	togglePixel = () => {
		const {
			setValue,
			value = false,
		} = this.props;
		if (setValue) {
			setValue(!value);
		}
	}

	render({
		value = false,
	}) {
		return <div onClick={this.togglePixel} className={`pixel ${value ? 'one' : 'zero'}`} />;
	}
}

export function mapStateToProps(state, {
	character = '',
	x = 0,
	y = 0,
}) {
	const characters = getCharacters(state);
	const {
		[character]: {
			[positionToString(x, y)]: value,
		} = {},
	} = characters;
	return {
		value,
	};
}

export function mapDispatchToProps(dispatch, {
	character = '',
	x = 0,
	y = 0,
}) {
	return {
		setValue: value => dispatch(setPixel({ character, x, y, value }))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pixel);
