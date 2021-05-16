/* @jsx h */
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getHeight, getWidth, setHeight, setWidth } from '../../../reducers/font';
import './FontSize.css';

export function FontSize() {
	const width = useSelector(getWidth);
	const height = useSelector(getHeight);
	const dispatch = useDispatch();
	const onWidthChange = useCallback(({ currentTarget: { value = '' } = {} }) => {
		dispatch(setWidth(value));
	}, []);
	const onHeightChange = useCallback(({ currentTarget: { value = '' } = {} }) => {
		dispatch(setHeight(value));
	}, []);
	return (
		<div className="font-size">
			<label for="font-width">Width: </label>
			<input type="number" name="font-width" value={width} onChange={onWidthChange} />
			<label for="font-height">Height: </label>
			<input type="number" name="font-height" value={height} onChange={onHeightChange} />
		</div>
	);
}

export default FontSize;
