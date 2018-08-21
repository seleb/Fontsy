import { h, Component } from 'preact';

import './About.css';

export default function About() {
	return (
		<div className="about">
			<p>With the release of Bitsy 5 came a brand-new font system. The new system is far more customizable than the old one: among other features, it includes a spec for a <code>.bitsyfont</code> format which can be used to make custom fonts.</p>
			<p>Since the format is plaintext, it's relatively easy to make custom fonts by typing them out in a text editor, but from a creative perspective, it's a bit hard to draw characters that way. To help with this, Fontsy provides a way to convert back-and-forth between <code>.bitsyfont</code> and <code>.bitsyfont.png</code> files, which can be used to draw fonts in a more traditional image editor.</p>
			<p>Notes:</p>
			<ul>
				<li>The default bitsy font is imported by default</li>
				<li>Fontsy doesn't save anything; make sure to export your work!</li>
				<li>Font data is 1-bit (i.e. black and white)</li>
				<li>The images used for the old custom font hack are not compatible with Fontsy</li>
				<li>If you're using the built-in editor, keep the export section closed to improve performance</li>
				<li>Hover over characters in built-in editor to see code points</li>
			</ul>
			<p>Recommended workflow:</p>
			<ol>
				<li>Pick an existing font to use as a base (e.g. the default bitsy font, or one of the others included in the bitsy editor)</li>
				<li>Import <code>.bitsyfont</code> file</li>
				<li>If needed, make minor edits using the built-in editor (e.g. changing size, name, or adding characters)</li>
				<li>Export <code>.bitsyfont.png</code> image</li>
				<li>Open image in external editor and customize font (note: make sure not to edit the borders)</li>
				<li>Import edited <code>.bitsyfont.png</code> image</li>
				<li>Export <code>.bitsyfont</code> file</li>
			</ol>
		</div>
	);
}
