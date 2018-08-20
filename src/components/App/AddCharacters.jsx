import { h, Component } from 'preact';

import Collapsible from '../Collapsible';
import ImportFont from './Import';
import AddCharacter from './AddCharacters/AddCharacter';
import CharacterSets from './Edit/CharacterSets';

import './AddCharacters.css';

export default class AddCharacters {
	render() {
		return (
				<main className="add-characters">
					<Collapsible header="Import Font" description="Replaces all characters"><ImportFont /></Collapsible>
					<Collapsible header="Add Code Point" description="Adds/removes a single character"><AddCharacter /></Collapsible>
					<Collapsible header="Add Character Set" description="Adds/removes all characters in set"><CharacterSets /></Collapsible>
				</main>
		);
	}
}
