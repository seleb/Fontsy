/* @jsx h */
import { h } from 'preact';
import characterSets from '../../../assets/characterSets';
import './CharacterSets.css';
import CharacterSet from './CharacterSets/CharacterSet';

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

export default CharacterSets;
