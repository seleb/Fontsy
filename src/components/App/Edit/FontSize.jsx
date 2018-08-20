import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './FontSize.css';
import {
	setWidth,
	setHeight,
	getWidth,
	getHeight,
} from '../../../reducers/font';

export class FontSize {
	onWidthChange = ({
		currentTarget: {
			value = '',
		} = {},
	}) => {
		const {
			setWidth,
		} = this.props;
		if (setWidth) {
			setWidth(value);
		}
	}
	onHeightChange = ({
		currentTarget: {
			value = '',
		} = {},
	}) => {
		const {
			setHeight,
		} = this.props;
		if (setHeight) {
			setHeight(value);
		}
	}

	render({
		width = 0,
		height = 0,
	}) {
		return (
			<div className="font-size">
				<label for="font-width">Width: </label>
				<input type="number" name="font-width" value={width} onChange={this.onWidthChange} />
				<label for="font-height">Height: </label>
				<input type="number" name="font-height" value={height} onChange={this.onHeightChange} />
			</div>
		);
	}
}
export function mapStateToProps(state) {
	return {
		width: getWidth(state),
		height: getHeight(state),
	};
}

export const mapDispatchToProps = {
	setWidth,
	setHeight,
};

export default connect(mapStateToProps, mapDispatchToProps)(FontSize);
