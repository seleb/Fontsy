import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import './GameData.css';

export function GameData({

}) {
	return <div className="gamedata" />;
}

export function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps)(GameData);
