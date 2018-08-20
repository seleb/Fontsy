import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import DataExport from './Export/DataExport';
import ImageExport from './Export/ImageExport';
import Collapsible from '../Collapsible';

import './Export.css';

export function Export({

}) {
	return (
		<div className="export">
			<Collapsible header="Data" description="Font in .bitsyfont format"><DataExport /></Collapsible>
			<Collapsible header="Image" description="Font as .bitsyfont.png for editing in external program"><ImageExport /></Collapsible>
		</div>
	);
}

export function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(Export);
