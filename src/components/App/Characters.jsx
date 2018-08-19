import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { getCharacters } from '../../reducers/font';

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

	onWheel = event => {
		this.setState(({ row }) => ({
			row: Math.max(0, row + Math.sign(event.deltaY)),
		}));
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
			<div className="characters" style={style} onWheel={this.onWheel}>
				{characters
					.slice(row * charactersPerRow, (row + rows) * charactersPerRow)
					.map(character => <Character character={character} />)}
			</div>
		);
	}
}

export function mapStateToProps(state) {
	return {
		characters: Object.keys(getCharacters(state)),
	};
}

export default connect(mapStateToProps)(Characters);
