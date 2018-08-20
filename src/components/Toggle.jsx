import { h, Component } from 'preact';

import './Toggle.css';

export default function Toggle({
	enabled = false,
	onClick,
	title = '',
}) {
	return (
		<button onClick={onClick} title={title} className={`button ${enabled ? 'on' : 'off'}`}>
			{enabled ? '➖' : '➕'}
		</button>
	);
}
