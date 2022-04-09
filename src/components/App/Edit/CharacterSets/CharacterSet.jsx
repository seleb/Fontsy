/* @jsx h */
import { h } from 'preact';
import { useCallback, useLayoutEffect, useMemo, useRef } from 'preact/hooks';
import { useDispatch, useSelector } from '../../../../reducers';
import { addCharacters, getCharacters, removeCharacters } from '../../../../reducers/font';
import './CharacterSet.css';

export function CharacterSet({ name = '', start = 0, end = 0 }) {
	const refInput = useRef();
	const characters = useSelector(getCharacters);
	const characterSet = useMemo(() => new Array(end - start).fill(start).map((v, i) => v + i), [start, end]);
	const dispatch = useDispatch();
	const state = useMemo(() => {
		if (characterSet.every((i) => characters[i])) return 'checked';
		if (characterSet.some((i) => characters[i])) return 'indeterminate';
		return 'unchecked';
	}, [characters, characterSet]);
	const onClick = useCallback(() => {
		if (state === 'indeterminate' || state === 'unchecked') {
			dispatch(addCharacters(characterSet));
		} else {
			dispatch(removeCharacters(characterSet));
		}
	}, [state]);
	useLayoutEffect(() => {
		if (refInput.current) {
			refInput.current.indeterminate = state === 'indeterminate';
		}
	}, [state]);
	const title = `${name} (${end - start})`;
	return (
		<label class="character-set">
			<span className="name" title={title}>
				{title}
			</span>
			<input ref={refInput} type="checkbox" checked={state !== 'unchecked'} onClick={onClick} />
		</label>
	);
}

export default CharacterSet;
