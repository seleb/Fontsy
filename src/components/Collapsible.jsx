/* @jsx h */
import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import './Collapsible.css';
import Toggle from './Toggle';

export default function Collapsible({
	children,
	header = '',
	description = '',
	open: startOpen = false
}) {
	const [open, setOpen] = useState(startOpen);
	const toggleOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);
	return (
		<section className={`collapsible ${open ? 'open' : 'closed'}`}>
			<header className="header">
				<Toggle onClick={toggleOpen} enabled={open}/>
				<h1 className="name">{header}</h1><h2 className="description">{description}</h2>
			</header>
			{open && <main className="content">
				{children}
			</main>}
		</section>
	);
}
