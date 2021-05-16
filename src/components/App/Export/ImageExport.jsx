/* @jsx h */
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { fontToImage } from '../../../lib/imageConverter';
import { getCharactersWithPixels, getHeight, getName, getWidth } from '../../../reducers/font';
import './ImageExport.css';

export function ImageExport() {
	const name = useSelector(getName);
	const width = useSelector(getWidth);
	const height = useSelector(getHeight);
	const characters = useSelector(getCharactersWithPixels);

	const {
		width: characterWidth,
		height: characterHeight,
		src,
	} = useMemo(
		() =>
			fontToImage({
				width,
				height,
				characters,
			}),
		[width, height, characters]
	);
	const title = `${name}.bitsyfont.png`;
	return (
		<div className="image-export">
			<a download={title} href={src} title={title}>
				<img src={src} width={characterWidth} height={characterHeight} alt={title} title={title} />
			</a>
		</div>
	);
}

export default ImageExport;
