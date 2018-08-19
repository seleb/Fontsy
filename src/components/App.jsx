import { h, Component } from 'preact';

import './App.css';
import CharacterSets from './App/CharacterSets';
import Characters from './App/Characters';
import GameData from './App/GameData';

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
					<CharacterSets />
					<Characters />
					<GameData />
				</main>
				<footer>
					<h2>Fontsy</h2>
				</footer>
			</div>
		);
	}
}
