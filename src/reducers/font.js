// pixel helpers
export function positionToString(x, y) {
	return `${x},${y}`;
}

// actions
export const CHARACTERS_ADD = 'font:character:add';
export const CHARACTERS_REMOVE = 'font:character:remove';
export const SIZE_SET = 'font:size:set';
export const PIXEL_SET = 'font:pixel:set';

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

export function setPixel({
	character = '',
	x = 0,
	y = 0,
	value = false,
}) {
	return { type: PIXEL_SET, character, x, y, value };
}

// reducer
const initialState = {
	width: 6,
	height: 8,
	characters: {
		10: {},
	}, // TODO: add bitsy default font
};

export default function fontReducer(state = initialState, action) {
	switch (action.type) {
		case CHARACTERS_ADD:
			return {
				...state,
				characters: {
					...state.characters,
					...action.characters.reduce((result, character) => {
						result[character] = {};
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
		case PIXEL_SET:
			{
				const {
					character,
					x,
					y,
					value,
				} = action;
				const {
					characters: {
						[action.character]: {
							[positionToString(x, y)]: editedPixel,
							...characterPixels,
						} = {},
						...characters,
					},
				} = state;
				const newPixels = value ? {
					...characterPixels,
					[positionToString(x, y)]: value,
				} : characterPixels;
				return {
					...state,
					characters: {
						...characters,
						[character]: newPixels
					},
				};
			}
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
