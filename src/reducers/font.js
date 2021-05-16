import defaultFont from '../assets/ascii_small';
import { textToFont } from '../lib/fontConverter';

// pixel helpers
export function positionToString(x, y) {
	return `${x},${y}`;
}

// actions
export const CHARACTERS_ADD = 'font:character:add';
export const CHARACTERS_REMOVE = 'font:character:remove';
export const CHARACTERS_REMOVE_ALL = 'font:character:remove_all';
export const CHARACTERS_CLEAR_ALL = 'font:character:clear_all';
export const SIZE_SET = 'font:size:set';
export const PIXELS_SET = 'font:pixel:set';
export const NAME_SET = 'font:name:set';
export const FONT_SET = 'font:set';
export const FONT_MERGE = 'font:merge';

// action creators
export function addCharacters(characters = []) {
	return { type: CHARACTERS_ADD, characters: characters.map((c) => c.toString(10)) };
}

export function removeCharacters(characters = []) {
	return { type: CHARACTERS_REMOVE, characters: characters.map((c) => c.toString(10)) };
}

export function addCharacter(character = '') {
	return addCharacters([character]);
}

export function removeCharacter(character = '') {
	return removeCharacters([character]);
}

export function removeAllCharacters() {
	return { type: CHARACTERS_REMOVE_ALL };
}

export function clearAllCharacters() {
	return { type: CHARACTERS_CLEAR_ALL };
}

export function setSize({ width, height }) {
	return { type: SIZE_SET, width, height };
}
export function setWidth(width) {
	return setSize({ width: parseInt(width, 10) });
}
export function setHeight(height) {
	return setSize({ height: parseInt(height, 10) });
}

export function setPixels(pixels = []) {
	return { type: PIXELS_SET, pixels };
}
export function setPixel({ character = '', x = 0, y = 0, value = false }) {
	return setPixels([{ character, x, y, value }]);
}

export function setName(name) {
	return { type: NAME_SET, name };
}

export function setFont({ name, width, height, pixels }) {
	return { type: FONT_SET, name, width, height, pixels };
}

export function mergeFont({ name, width, height, pixels }) {
	return { type: FONT_MERGE, name, width, height, pixels };
}

// reducer
const initialState = fontReducer({}, setFont(textToFont(defaultFont)));

export default function fontReducer(state = initialState, action) {
	switch (action.type) {
		case CHARACTERS_ADD:
			return {
				...state,
				characters: {
					...state.characters,
					...action.characters.reduce((result, character) => {
						result[character] = state.characters[character] || {};
						return result;
					}, {}),
				},
			};
		case CHARACTERS_REMOVE:
			return {
				...state,
				characters: Object.entries(state.characters)
					.filter(([character]) => !action.characters.includes(character))
					.reduce((result, [character, pixels]) => {
						result[character] = pixels;
						return result;
					}, {}),
			};
		case CHARACTERS_REMOVE_ALL:
			return {
				...state,
				characters: {},
			};
		case CHARACTERS_CLEAR_ALL:
			return {
				...state,
				characters: Object.keys(state.characters).reduce((result, character) => {
					result[character] = {};
					return result;
				}, {}),
			};
		case SIZE_SET: {
			const { width = state.width, height = state.height } = action;
			return {
				...state,
				width,
				height,
			};
		}
		case PIXELS_SET: {
			const newCharacters = action.pixels.reduce((result, { character = '' }) => {
				const { characters: { [character]: oldCharacter = {} } = {} } = state;
				result[character] = {
					...oldCharacter,
				};
				return result;
			}, {});
			action.pixels.reduce((result, { character = '', x = 0, y = 0, value = false }) => {
				result[character][positionToString(x, y)] = value;
				return result;
			}, newCharacters);
			const { character, x, y, value } = action;
			const { characters: oldCharacters = {} } = state;
			return {
				...state,
				characters: {
					...oldCharacters,
					...newCharacters,
				},
			};
		}
		case NAME_SET:
			return {
				...state,
				name: action.name,
			};
		case FONT_SET:
			return [removeAllCharacters(), setName(action.name), mergeFont(action)].reduce((result, action) => fontReducer(result, action), state);
		case FONT_MERGE:
			return [setSize(action), setPixels(action.pixels)].reduce((result, action) => fontReducer(result, action), state);
		default:
			return state;
	}
}

// selectors
export function getCharacters({ font: { characters = {} } = {} }) {
	return characters;
}

export function getWidth({ font: { width = 0 } = {} }) {
	return width;
}

export function getHeight({ font: { height = 0 } = {} }) {
	return height;
}

export function getName({ font: { name = '' } = {} }) {
	return name;
}

export function getPixelValue({ font: { characters = {} } = {} }, { character, x, y }) {
	const { [character]: { [positionToString(x, y)]: value } = {} } = characters;
	return !!value;
}

export function getCharactersWithPixels(state) {
	const width = getWidth(state);
	const height = getHeight(state);
	return Object.keys(getCharacters(state)).map((character) => {
		// character
		const pixels = [];
		for (let y = 0; y < height; ++y) {
			const row = [];
			pixels.push(row);
			for (let x = 0; x < width; ++x) {
				row.push(getPixelValue(state, { character, x, y }));
			}
		}

		return {
			character,
			pixels,
		};
	});
}
