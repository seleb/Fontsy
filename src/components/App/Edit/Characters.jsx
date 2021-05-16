/* @jsx h */
import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { getCharacters } from '../../../reducers/font';
import './Characters.css';
import Character from './Characters/Character';

const charactersPerRow = 16;
const rows = 4;

function getLimit(length) {
	return Math.max(0, Math.floor((length - 1) / charactersPerRow) - 3);
}

export function Characters() {
	const characters = useSelector(getCharacters);
	const limit = useMemo(() => getLimit(Object.keys(characters).length), [characters]);
	const [row, setRow] = useState(0);
	const nextPage = useCallback(() => {
		if (row < limit) {
			setRow(row + 1);
			return true;
		}
		return false;
	}, [limit, row]);
	const prevPage = useCallback(() => {
		if (row > 0) {
			setRow(row - 1);
			return true;
		}
		return false;
	}, [row]);
	const onWheel = useCallback((event) => {
		const dir = Math.sign(event.deltaY);
		const changed = (dir > 0 ? nextPage : prevPage)();
		if (changed) {
			event.preventDefault();
		}
	}, [nextPage, prevPage]);
	useEffect(() => {
		const limit = limit;
		if (row > limit) {
			setRow(limit);
		}
	}, [row, limit]);
	const style = {
		gridTemplateColumns: `repeat(${charactersPerRow}, 1fr)`,
	};
	return (
		<main className="characters">
			<nav className="characters-controls">
				<button className="button prev" onClick={prevPage}>&lt;</button>
				{row + 1}/{limit + 1}
				<button className="button next" onClick={nextPage}>&gt;</button>
			</nav>
			<div className="characters" style={style} onWheel={onWheel}>
				{Object.keys(characters)
					.slice(row * charactersPerRow, (row + rows) * charactersPerRow)
					.map(character => <Character key={character} character={character} />)}
			</div>
		</main>
	);
}

export default Characters;
