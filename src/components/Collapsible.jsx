/* @jsx h */
import { h } from 'preact';
import './Collapsible.css';

export default function Collapsible({ children, header = '', description = '', open: startOpen = false }) {
	return (
		<details open={startOpen} className="collapsible">
			<summary>
				<h1>{header}</h1>
				<h2>{description}</h2>
			</summary>
			<section>{children}</section>
		</details>
	);
}
