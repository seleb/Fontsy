// helpers for saving/loading bitsyfont pngs

export function intToRgb(int = 0) {
	return {
		r: Math.floor(int / 255 / 255) % 255,
		g: Math.floor(int / 255) % 255,
		b: int % 255,
	};
}

export function rgbToInt({ r = 0, g = 0, b = 0 }) {
	return r * 255 * 255 + g * 255 + b;
}

export function imageToFont(src) {
	return new Promise(resolve => {
		const img = new Image();
		img.onload = () => {
			// convert into readable format
			const width = img.width;
			const height = img.height;

			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			canvas.width = width;
			canvas.height = height;
			context.drawImage(img, 0, 0);

			const { data } = context.getImageData(0, 0, width, height);
			const getPixel = (x, y) => ({
				r: data[y * width * 4 + x * 4 + 0],
				g: data[y * width * 4 + x * 4 + 1],
				b: data[y * width * 4 + x * 4 + 2],
				a: data[y * width * 4 + x * 4 + 3],
			});

			// get width/height
			let charWidth = 0;
			for (let x = 1; x < width; ++x) {
				const {
					r = 0,
						g = 0,
						b = 0,
				} = getPixel(x, 0);
				if (r !== 255 || g !== 0 || b !== 0) {
					charWidth = x - 1;
					break;
				}
			}
			let charHeight = 0;
			for (let y = 1; y < height; ++y) {
				const {
					r = 0,
						g = 0,
						b = 0,
				} = getPixel(0, y);
				if (r !== 255 || g !== 0 || b !== 0) {
					charHeight = y - 1;
					break;
				}
			}

			if (!charWidth || !charHeight) {
				throw new Error('Couldn\'t get character width/height');
			}

			// get characters/pixels
			const characters = [];
			const pixels = [];
			for (let row = 0; row < height; row += charHeight + 1) {
				for (let col = 0; col < width; col += charWidth + 1) {
					const character = rgbToInt(getPixel(col, row));
					characters.push(character);
					for (let y = 0; y < charHeight; ++y) {
						for (let x = 0; x < charWidth; ++x) {
							pixels.push({
								character,
								x,
								y,
								value: getPixel(col + x + 1, row + y + 1).r > 128,
							});
						}
					}
				}
			}

			resolve({
				width: charWidth,
				height: charHeight,
				characters,
				pixels,
			});
		};

		// start load
		img.src = src;
	});
}

export function fontToImage({
	width = 0,
	height = 0,
	characters = [],
}) {
	const sqrt = Math.sqrt(characters.length);
	const charactersPerRow = Math.floor(sqrt);
	const charactersPerCol = Math.ceil(sqrt);

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	const white = 'rgb(255,255,255)';
	const black = 'rgb(0,0,0)';
	const red = 'rgb(255,0,0)';

	canvas.width = charactersPerRow * (width + 1);
	canvas.height = charactersPerCol * (height + 1);

	// start with black fill
	context.fillStyle = black;
	context.fillRect(
		0, 0,
		canvas.width, canvas.height
	);

	// add red borders
	context.fillStyle = red;
	for (let x = 0; x <= canvas.width; x += width + 1) {
		context.fillRect(
			x, 0,
			1, canvas.height
		);
	}
	for (let y = 0; y <= canvas.height; y += height + 1) {
		context.fillRect(
			0, y,
			canvas.width, 1
		);
	}

	// add characters
	for (let col = 0; col < charactersPerCol; ++col) {
		for (let row = 0; row < charactersPerRow; ++row) {
			const {
				character = 0,
				pixels = [],
			} = characters[col * charactersPerRow + row] || {};
			// draw id corner
			const rgb = intToRgb(character);
			context.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
			context.fillRect(
				row * (width + 1), col * (height + 1),
				1, 1
			);

			// draw character
			context.fillStyle = white;
			for (let y = 0; y < height; ++y) {
				if (pixels[y]) {
					for (let x = 0; x < width; ++x) {
						if (pixels[y][x]) {
							context.fillRect(
								x + 1 + row * (width + 1), y + 1 + col * (height + 1),
								1, 1
							);
						}
					}
				}
			}
		}
	}

	return {
		src: canvas.toDataURL(),
		width: canvas.width,
		height: canvas.height,
	};
}
