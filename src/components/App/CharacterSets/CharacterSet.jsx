import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import {
	addCharacter,
	removeCharacter,
} from '../../../reducers/font';

import './CharacterSet.css';


export class CharacterSet {
	add = () => {
		const {
			addCharacter,
			start,
			end,
		} = this.props;
		if (addCharacter) {
			for (let i = start; i <= end; ++i) {
				addCharacter(i);
			}
		}
	}

	remove = () => {
		const {
			removeCharacter,
			start,
			end,
		} = this.props;
		if (removeCharacter) {
			for (let i = start; i <= end; ++i) {
				removeCharacter(i);
			}
		}
	}

	render({
		name = '',
		start = 0,
		end = 0,
	}) {
		const title=`${name} (${end-start})`;
		return (
			<div class="character-set">
				<span className="name" title={title}>{title}</span>
				<button className="button add" title="add all characters in this set" onClick={this.add}>+</button>
				<button className="button remove" title="remove all characters in this set" onClick={this.remove}>-</button>
			</div>
		);
	}
}

export const mapDispatchToProps = {
	addCharacter,
	removeCharacter,
};

export default connect(undefined, mapDispatchToProps)(CharacterSet);
