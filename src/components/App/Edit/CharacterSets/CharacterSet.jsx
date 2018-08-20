import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import {
	addCharacters,
	removeCharacters,
} from '../../../../reducers/font';

import Toggle from '../../../Toggle';

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
				<Toggle title={`add all ${name} characters`} onClick={this.add}/>
				<Toggle title={`remove all ${name} characters`} onClick={this.remove} enabled/>
			</div>
		);
	}
}

export const mapDispatchToProps = {
	addCharacters,
	removeCharacters,
};

export default connect(undefined, mapDispatchToProps)(CharacterSet);
