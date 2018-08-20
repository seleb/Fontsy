import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { getWidth, getHeight } from '../../../../reducers/font';

import Pixel from './Character/Pixel';

import './Character.css';

export function Character({
	character = '',
	width = 0,
	height = 0,
}) {
	const pixels = [];
	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			pixels.push(<Pixel key={`${character},${x},${y}`} character={character} x={x} y={y} />);
		}
	}
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

export function mapStateToProps(state) {
	return {
		width: getWidth(state),
		height: getHeight(state),
	};
}

export default connect(mapStateToProps)(Character);
