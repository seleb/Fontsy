import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './Reset.css';
import {
	removeAllCharacters,
	clearAllCharacters,
} from '../../../reducers/font';

export function Reset({
	clearAllCharacters,
	removeAllCharacters,
}) {
	return (
		<div className="reset">
			<button className="button clear" onClick={clearAllCharacters}>Clear (erase all characters)</button>
			<button className="button reset" onClick={removeAllCharacters}>Reset (remove all characters)</button>
		</div>
	);
}

export const mapDispatchToProps = {
	removeAllCharacters,
	clearAllCharacters,
};

export default connect(undefined, mapDispatchToProps)(Reset);
