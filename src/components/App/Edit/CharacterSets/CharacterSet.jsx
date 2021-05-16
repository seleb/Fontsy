/* @jsx h */
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { addCharacters, removeCharacters } from '../../../../reducers/font';
import Toggle from '../../../Toggle';
import './CharacterSet.css';

export function CharacterSet({
	name = '',
	start = 0,
	end = 0,
}) {
	const dispatch = useDispatch();
	const add = useCallback(() => {
		dispatch(addCharacters(new Array(end - start).fill(start).map((v, i) => v + i)));
	}, [start, end]);
	const remove = useCallback(() => {
		dispatch(removeCharacters(new Array(end - start).fill(start).map((v, i) => v + i)));
	}, [start, end]);
	const title = `${name} (${end - start})`;
	return (
		<div class="character-set">
			<span className="name" title={title}>{title}</span>
			<Toggle title={`add all ${name} characters`} onClick={add}/>
			<Toggle title={`remove all ${name} characters`} onClick={remove} enabled/>
		</div>
	);
}

export default CharacterSet;
