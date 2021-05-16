/* @jsx h */
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { getHeight, getWidth } from '../../../../reducers/font';
import './Character.css';
import Pixel from './Character/Pixel';

export function Character({
	character = '',
}) {
	const width = useSelector(getWidth);
	const height = useSelector(getHeight);
	const pixels = useMemo(() => {
		const result = [];
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				result.push(<Pixel key={`${character},${x},${y}`} character={character} x={x} y={y} />);
			}
		}
		return result;
	}, [character]);
	const style = {
		gridTemplateRows: `repeat(${height}, 1fr)`,
		gridTemplateColumns: `repeat(${width}, 1fr)`,
	};
	const characterStr = String.fromCodePoint(character);
	return (
		<div data-character={characterStr} title={`${character}: ${characterStr}`} className="character" style={style}>
			{pixels}
		</div>
	);
}

export default Character;
