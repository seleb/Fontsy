import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import {
	addCharacters,
	removeCharacters,
} from '../../../../reducers/font';

import './CharacterSet.css';


export class CharacterSet {
	add = () => {
		const {
			addCharacters,
			start,
			end,
		} = this.props;
		if (addCharacters) {
			addCharacters(new Array(end - start).fill(start).map((v, i) => v + i));
		}
	}

	remove = () => {
		const {
			removeCharacters,
			start,
			end,
		} = this.props;
		if (removeCharacters) {
			removeCharacters(new Array(end - start).fill(start).map((v, i) => v + i));
		}
	}

	render({
		name = '',
		start = 0,
		end = 0,
	}) {
		const title = `${name} (${end - start})`;
		return (
			<div class="character-set">
				<span className="name" title={title}>{title}</span>
				<button className="button add" title={`add all ${name} characters`} onClick={this.add}>➕</button>
				<button className="button remove" title={`remove all ${name} characters`} onClick={this.remove}>➖</button>
			</div>
		);
	}
}

export const mapDispatchToProps = {
	addCharacters,
	removeCharacters,
};

export default connect(undefined, mapDispatchToProps)(CharacterSet);
