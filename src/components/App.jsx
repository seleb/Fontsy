import { h, Component } from 'preact';

import './App.css';
import AddCharacters from './App/AddCharacters';
import Characters from './App/Characters';
import GameData from './App/GameData';
import Collapsible from './Collapsible';

export default class App {
	componentDidMount() {
		const link = document.createElement('link');
		link.href = 'https://fonts.googleapis.com/css?family=Noto+Sans&amp;subset=cyrillic,cyrillic-ext,devanagari,greek,greek-ext,latin-ext,vietnamese';
		link.rel = 'stylesheet';
		document.head.appendChild(link);
	}

	render() {
		return (
			<div class="app">
				<main>
					<GameData />
					<Collapsible header="Add Characters" description="Add/remove characters"><AddCharacters /></Collapsible>
					<Collapsible header="Edit Characters" description="Edit character pixels (note: this editor is very basic; it's recommended you export, make changes in an external image editor, and re-import)"><Characters /></Collapsible>
				</main>
				<footer>
					<h2>Fontsy</h2>
				</footer>
			</div>
		);
	}
}
