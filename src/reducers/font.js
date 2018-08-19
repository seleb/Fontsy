// pixel helpers
export function positionToString(x, y) {
	return `${x},${y}`;
}

// actions
export const CHARACTERS_ADD = 'font:character:add';
export const CHARACTERS_REMOVE = 'font:character:remove';
export const SIZE_SET = 'font:size:set';
export const PIXELS_SET = 'font:pixel:set';
export const NAME_SET = 'font:name:set';

// action creators
export function addCharacters(characters = []) {
	return { type: CHARACTERS_ADD, characters: characters.map(c => c.toString(10)) };
}

export function removeCharacters(characters = []) {
	return { type: CHARACTERS_REMOVE, characters: characters.map(c => c.toString(10)) };
}

export function addCharacter(character = '') {
	return addCharacters([character]);
}

export function removeCharacter(character = '') {
	return removeCharacters([character]);
}

export function setSize({
	width,
	height,
}) {
	return { type: SIZE_SET, width, height };
}
export function setWidth(width) {
	return setSize({ width });
}
export function setHeight(height) {
	return setSize({ height });
}

export function setPixels(pixels = []) {
	return { type: PIXELS_SET, pixels };
}
export function setPixel({
	character = '',
	x = 0,
	y = 0,
	value = false,
}) {
	return setPixels([{ character, x, y, value }]);
}

export function setName(name) {
	return { type: NAME_SET, name };
}


// reducer
const initialState = {
	width: 6,
	height: 8,
	characters: {
		10: {},
	}, // TODO: add bitsy default font
	name: 'my font',
};

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
		case SIZE_SET:
			{
				const {
					width = state.width,
						height = state.height,
				} = action;
				return {
					...state,
					width,
					height,
				};
			}
		case PIXELS_SET:
			{
				const newCharacters = action.pixels.reduce((result, {
					character = '',
				}) => {
					const {
						characters: {
							[character]: oldCharacter = {},
						} = {},
					} = state;
					result[character] = {
						...oldCharacter,
					};
					return result;
				}, {});
				action.pixels.reduce((result, {
					character = '',
					x = 0,
					y = 0,
					value = false,
				}) => {
					result[character][positionToString(x, y)] = value;
					return result;
				}, newCharacters);
				const {
					character,
					x,
					y,
					value,
				} = action;
				const {
					characters: oldCharacters = {},
				} = state;
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
		default:
			return state;
	}
}

// selectors
export function getCharacters({
	font: {
		characters = {},
	} = {},
}) {
	return characters;
}

export function getWidth({
	font: {
		width = 0,
	} = {},
}) {
	return width;
}

export function getHeight({
	font: {
		height = 0,
	} = {},
}) {
	return height;
}

export function getName({
	font: {
		name = '',
	} = {},
}) {
	return name;
}

export function getPixelValue({
	font: {
		characters = {},
	} = {},
}, { character, x, y }) {
	const {
		[character]: {
			[positionToString(x, y)]: value,
		} = {},
	} = characters;
	return !!value;
}
