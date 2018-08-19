import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import FontName from './Export/FontName';
import DataExport from './Export/DataExport';
import ImageExport from './Export/ImageExport';
import Collapsible from '../Collapsible';

import './Export.css';

export function Export({

}) {
	return (
		<div className="export">
			<FontName />
			<Collapsible header="Data" description="Export font as bitsy font data"><DataExport /></Collapsible>
			<Collapsible header="Image" description="Export font as PNG for editing in external program"><ImageExport /></Collapsible>
		</div>
	);
}

export function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(Export);
