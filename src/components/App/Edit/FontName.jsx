/* @jsx h */
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from '../../../reducers';
import { getName, setName } from '../../../reducers/font';
import './FontName.css';

export function FontName() {
	const name = useSelector(getName);
	const dispatch = useDispatch();
	const onChange = useCallback(({ currentTarget: { value = '' } = {} }) => {
		dispatch(setName(value));
	}, []);
	return (
		<div className="font-name">
			<label for="font-name">Font name: </label>
			<input type="text" name="font-name" value={name} onChange={onChange} />
		</div>
	);
}

export default FontName;
