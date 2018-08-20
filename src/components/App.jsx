import { h, Component } from 'preact';

import './App.css';
import AddCharacters from './App/AddCharacters';
import Characters from './App/Characters';
import Export from './App/Export';
import Collapsible from './Collapsible';

export default class App {
	componentDidMount() {
		// add google font
		// probably a better way to do this but this works for now
		const link = document.createElement('link');
		link.href = 'https://fonts.googleapis.com/css?family=Noto+Sans&amp;subset=cyrillic,cyrillic-ext,devanagari,greek,greek-ext,latin-ext,vietnamese';
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	}

	render() {
		return (
			<div class="app">
				<main>
					<Collapsible header="Add Characters" description="Add/remove characters"><AddCharacters /></Collapsible>
					<Collapsible header="Edit Characters" description="Edit character pixels (note: this editor is very basic; it's recommended you export, make changes in an external image editor, and re-import)"><Characters /></Collapsible>
					<Collapsible header="Export" description="Export compiled font" open><Export /></Collapsible>
				</main>
				<footer>
					<h2>Fontsy</h2>
					<a href="https://ledoux.itch.io/bitsy">Bitsy Game Maker</a>
					<a href="https://twitter.com/SeanSLeBlanc">Contact</a>
				</footer>
			</div>
		);
	}
}
