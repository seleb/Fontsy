import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { getCharacters } from '../../../reducers/font';

import Character from './Characters/Character';

import './Characters.css';

const charactersPerRow = 16;
const rows = 4;

function getLimit(length) {
	return Math.max(0, Math.floor((length - 1) / charactersPerRow) - 3);
}

export class Characters extends Component {
	constructor() {
		super();
		this.state = {
			row: 0,
		};
	}

	nextPage = () => {
		const {
			characters = [],
		} = this.props;
		this.setState(({ row }) => ({
			row: Math.min(getLimit(characters.length), ++row),
		}));
	}

	prevPage = () => {
		this.setState(({ row }) => ({
			row: Math.max(0, --row),
		}));
	}

	onWheel = event => {
		const {
			row = 0,
		} = this.state;
		const {
			characters = [],
		} = this.props;
		const dir = Math.sign(event.deltaY);
		if (dir < 0 && row <= 0) {
			return;
		}
		if (dir > 0 && row >= getLimit(characters.length)) {
			return;
		}
		(dir > 0 ? this.nextPage : this.prevPage)();
		event.preventDefault();
	}

	componentDidUpdate() {
		const {
			row = 0,
		} = this.state;
		if (row < 0) {
			this.setState({
				row: 0,
			});
		}
		const {
			characters = [],
		} = this.props;
		const limit = getLimit(characters.length);
		if (row > limit) {
			this.setState({
				row: limit,
			});
		}
	}

	render({
		characters = [],
	}, {
		row = 0,
	}) {
		const style = {
			gridTemplateColumns: `repeat(${charactersPerRow}, 1fr)`,
		};
		return (
			<main className="characters">
				<nav className="characters-controls">
					<button className="button prev" onClick={this.prevPage}>&lt;</button>
					{row + 1}/{getLimit(characters.length) + 1}
					<button className="button next" onClick={this.nextPage}>&gt;</button>
				</nav>
				<div className="characters" style={style} onWheel={this.onWheel}>
					{characters
						.slice(row * charactersPerRow, (row + rows) * charactersPerRow)
						.map(character => <Character key={character} character={character} />)}
				</div>
			</main>
		);
	}
}

export function mapStateToProps(state) {
	return {
		characters: Object.keys(getCharacters(state)),
	};
}

export default connect(mapStateToProps)(Characters);
