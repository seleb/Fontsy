/* @jsx h */
import Draw1Bit from 'draw-1-bit';
import { h } from 'preact';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import { useDispatch, useSelector } from '../../../../reducers';
import { getHeight, getPixels, getWidth, positionToString, setPixel } from '../../../../reducers/font';
import './Character.css';

export function Character({ character = '' }) {
	const dispatch = useDispatch();
	const width = useSelector(getWidth);
	const height = useSelector(getHeight);
	const pixels = useSelector(state => getPixels(state, character));
	const style = {
		width: `${width/2}rem`,
		height: `${height/2}rem`,
	};
	const characterStr = String.fromCodePoint(character);
	const drawRef = useRef();
	const ref = useRef();
	const setValue = useCallback((x, y, value) => dispatch(setPixel({ character, x, y, value })), [character]);
	useLayoutEffect(() => {
		drawRef.current = new Draw1Bit({ width, height, gridLimit: 4 });
	}, [drawRef]);
	useLayoutEffect(() => {
		drawRef.current.resize(width, height);
		drawRef.current.render();
	}, [width, height]);
	useLayoutEffect(() => {
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				drawRef.current.fill(x, y, !!pixels[positionToString(x,y)]);
			}
		}
		drawRef.current.render();
	}, [width, height, pixels]);
	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.appendChild(drawRef.current.canvas);
	}, [ref]);
	useEffect(() => {
		function onInput(event) {
			setValue(event.detail.x, event.detail.y, event.detail.value);
		}
		drawRef.current.addEventListener('draw', onInput);
		return () => {
			drawRef.current.removeEventListener('draw', onInput);
		};
	}, [setValue]);
	return (
		<div ref={ref} data-character={characterStr} title={`${character}: ${characterStr}`} className="character" style={style} />
	);
}

export default Character;
