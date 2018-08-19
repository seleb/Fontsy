// helpers for saving/loading bitsyfont pngs

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
