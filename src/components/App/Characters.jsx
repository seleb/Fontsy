import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { getCharacters } from '../../reducers/font';

import Character from './Characters/Character';

import './Characters.css';

export function Characters({
	characters = {},
}) {
	return (
		<div className="characters">
			{Object.keys(characters).map(character => <Character character={character} />)}
		</div>
	);
}

export function mapStateToProps(state) {
	return {
		characters: getCharacters(state),
	};
}

export default connect(mapStateToProps)(Characters);
