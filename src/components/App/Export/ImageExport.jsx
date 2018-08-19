import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './ImageExport.css';

export function ImageExport({

}) {
	return <div className="image-export">Export image (TODO)</div>;
}

export function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(ImageExport);
