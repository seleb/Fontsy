/* @jsx h */
import { h } from 'preact';
import pkg from '../../package.json';
import './App.css';
import About from './App/About';
import Edit from './App/Edit';
import Export from './App/Export';
import Import from './App/Import';
import Collapsible from './Collapsible';

export default function App() {
	return (
		<div class="app">
			<main>
				<Collapsible header="About">
					<About />
				</Collapsible>
				<Collapsible header="Import" description="Import .bitsyfont or .png files" open>
					<Import />
				</Collapsible>
				<Collapsible header="Edit" description="Add, edit, or remove characters">
					<Edit />
				</Collapsible>
				<Collapsible header="Export" description="Export compiled font" open>
					<Export />
				</Collapsible>
			</main>
			<footer>
				<h2>{pkg.name}</h2>v{pkg.version}
				<a href="https://ledoux.itch.io/bitsy">Bitsy Game Maker</a>
				<a href="https://itch.io/game-assets/tag-bitsy/tag-fonts">More bitsyfonts</a>
				<a href="https://twitter.com/SeanSLeBlanc">Contact</a>
			</footer>
		</div>
	);
}
