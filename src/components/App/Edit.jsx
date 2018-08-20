import { h, Component } from 'preact';

import './Edit.css';
import FontName from './Edit/FontName';
import AddCharacter from './Edit/AddCharacter';
import Characters from './Edit/Characters';
import CharacterSets from './Edit/CharacterSets';
import Collapsible from '../Collapsible';
import Reset from './Edit/Reset';

export default function Edit() {
	return (
		<div className="edit">
			<FontName />
			<Reset />
			<Collapsible header="Code Points" description="Add/remove individual characters"><AddCharacter /></Collapsible>
			<Collapsible header="Character Sets" description="Add/remove all characters in set"><CharacterSets /></Collapsible>
			<Collapsible header="Draw" description="Basic pixel editor for font characters"><Characters /></Collapsible>
		</div>
	);
}
