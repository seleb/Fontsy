/* @jsx h */
import { h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { useDispatch, useSelector } from '../../../reducers';
import { addCharacter, getCharacters, removeCharacter } from '../../../reducers/font';
import './AddCharacter.css';

export function AddCharacter() {
	const characters = useSelector(getCharacters);
	const dispatch = useDispatch();
	const [character, setCharacter] = useState(0);
	const add = useCallback(() => {
		dispatch(addCharacter(character));
	}, [character]);
	const remove = useCallback(() => {
		dispatch(removeCharacter(character));
	}, [character]);
	const onChangeNumber = useCallback((event) => {
		setCharacter(parseInt(event.currentTarget.value || '0'), 10);
		event.preventDefault();
	}, []);
	const onChangeString = useCallback((event) => {
		setCharacter(parseInt((event.currentTarget.value || '\0').charCodeAt(0), 10));
		event.preventDefault();
	}, []);
	const hasCharacter = useMemo(() => Object.keys(characters).includes(character.toString(10)), [characters, character]);
	return (
		<main className="add-character">
			<label for="add-character-input-number">Unicode Code Point: </label>
			<input type="number" name="add-character-input-number" min={0} max={0x10ffff} value={character} onChange={onChangeNumber} />
			<a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters" target="_blank" rel="noopener noreferrer">
				❓
			</a>
			<label for="add-character-input-string">Unicode Character: </label>
			<input type="text" name="add-character-input-string" maxLength={1} value={String.fromCodePoint(character)} onChange={onChangeString} />
			<input type="checkbox" checked={hasCharacter} onClick={hasCharacter ? remove : add} />
		</main>
	);
}

export default AddCharacter;
