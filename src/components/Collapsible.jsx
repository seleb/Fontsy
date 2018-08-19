import { h, Component } from 'preact';

import './Collapsible.css';

export default class Collapsible extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
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
					<button onClick={this.toggleOpen}>{open ? '➖' : '➕'}</button>
					<h1>{header}</h1>
				</header>
				{open && <main className="content">
					<h2>{description}</h2>
					{children}
				</main>}
			</section>
		);
	}
}
