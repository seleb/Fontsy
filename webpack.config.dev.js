const merge = require('webpack-merge');
const base = require('./webpack.config.base.js');

module.exports = merge(base, {
	devtool: 'inline-source-map',

	// watcher
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
});
