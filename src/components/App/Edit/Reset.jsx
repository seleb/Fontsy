/* @jsx h */
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch } from 'react-redux';
import { clearAllCharacters as actionClearAllCharacters, removeAllCharacters as actionRemoveAllCharacters } from '../../../reducers/font';
import './Reset.css';

export function Reset() {
	const dispatch = useDispatch();
	const removeAllCharacters = useCallback((...args) => dispatch(actionRemoveAllCharacters(...args)), []);
	const clearAllCharacters = useCallback((...args) => dispatch(actionClearAllCharacters(...args)), []);
	return (
		<div className="reset">
			<button className="button clear" onClick={clearAllCharacters}>Clear (erase all characters)</button>
			<button className="button reset" onClick={removeAllCharacters}>Reset (remove all characters)</button>
		</div>
	);
}

export default Reset;
