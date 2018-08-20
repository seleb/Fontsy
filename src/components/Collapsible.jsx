import { h, Component } from 'preact';

import Toggle from './Toggle';
import './Collapsible.css';

export default class Collapsible extends Component {
	constructor({
		open = false,
	}) {
		super();
		this.state = {
			open,
		};
	}

	toggleOpen = () => {
		this.setState(({
			open = false,
		}) => ({
			open: !open,
		}));
	}

	render({
		children = [],
		header = '',
		description = '',
	}, {
		open = false,
	}) {
		return (
			<section className={`collapsible ${open ? 'open' : 'closed'}`}>
				<header className="header">
					<Toggle onClick={this.toggleOpen} enabled={open}/>
					<h1 className="name">{header}</h1><h2 className="description">{description}</h2>
				</header>
				{open && <main className="content">
					{children}
				</main>}
			</section>
		);
	}
}
