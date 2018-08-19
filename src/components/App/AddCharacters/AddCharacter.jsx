import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './AddCharacter.css';

import {
	addCharacter,
	removeCharacter,
	getCharacters,
} from '../../../reducers/font';

export class AddCharacter extends Component {
	constructor() {
		super();
		this.state = {
			character: 0,
		};
	}

	add = () => {
		const {
			character = 0,
		} = this.state;
		const {
			addCharacter,
		} = this.props;
		if (addCharacter) {
			addCharacter(character);
		}
	}

	remove = () => {
		const {
			character = 0,
		} = this.state;
		const {
			removeCharacter,
		} = this.props;
		if (removeCharacter) {
			removeCharacter(character);
		}
	}

	onChange = ({
		currentTarget: {
			value = '',
		} = {},
	}) => {
		this.setState({
			character: parseInt(event.currentTarget.value, 10),
		});
		event.preventDefault();
	}

	render({
		characters = [],
	}, {
		character = 0,
	}) {
		const hasCharacter = characters.includes(character.toString(10));
		return (
			<main className="add-character">
				<label for="add-character-input">Unicode Code Point: </label>
				<input type="number" name="add-character-input" min={0} value={character} onChange={this.onChange}/>
				<a href="https://en.wikipedia.org/wiki/List_of_Unicode_characters" target="_blank" rel="noopener noreferrer">❓</a>
				<button
					title={`${hasCharacter ? 'Remove' : 'Add'} character at code point ${character}`}
					onClick={hasCharacter ? this.remove : this.add}>
					{hasCharacter ? '➖' : '➕'}
				</button>
			</main>
		);
	}
}

export function mapStateToProps(state) {
	return {
		characters: Object.keys(getCharacters(state)),
	};
}

export const mapDispatchToProps = {
	addCharacter,
	removeCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCharacter);
