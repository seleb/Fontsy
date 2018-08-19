import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './FontName.css';
import {
	getName,
	setName,
} from '../../../reducers/font';

export class FontName {
	onChange = ({
		currentTarget: {
			value = '',
		} = {},
	}) => {
		const {
			setName,
		} = this.props;
		if (setName) {
			setName(value);
		}
	}
	render({
		name = '',
	}) {
		return (
			<div className="font-name">
				<label for="font-name">Font name</label>
				<input type="text" name="font-name" value={name} onChange={this.onChange} />
			</div>
		);
	}
}
export function mapStateToProps(state) {
	return {
		name: getName(state),
	};
}

export const mapDispatchToProps = {
	setName,
};

export default connect(mapStateToProps, mapDispatchToProps)(FontName);
