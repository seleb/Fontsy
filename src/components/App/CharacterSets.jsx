import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import CharacterSet from './CharacterSets/CharacterSet';

import './CharacterSets.css';

import characterSets from '../../assets/characterSets';

export function CharacterSets() {
	return (
		<div className="character-sets">
			{
				Object.entries(characterSets).map(([name, { start = 0, end = 0 }]) =>
					<CharacterSet name={name} start={start} end={end} />)
			}
		</div>
	);
}

export const mapDispatchToProps = {};

export default connect(undefined, mapDispatchToProps)(CharacterSets);
