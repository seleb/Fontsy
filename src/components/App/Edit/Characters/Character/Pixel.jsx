/* @jsx h */
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getPixelValue, setPixel } from "../../../../../reducers/font";
import './Pixel.css';

export function Pixel({
	character = '',
	x = 0,
	y = 0,
}) {
	const dispatch = useDispatch();
	const value = useSelector((state) => getPixelValue(state, { character, x, y }));
	const setValue = useCallback((value) => dispatch(setPixel({ character, x, y, value })), [character, x, y]);
	const togglePixel = useCallback(() => {
		setValue(!value)
	}, [setValue, value]);
	return <div onClick={togglePixel} className={`pixel ${value ? 'one' : 'zero'}`} />;
}

export default Pixel;
