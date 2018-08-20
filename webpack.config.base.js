const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const package = require('./package');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.js(x)?$/, // source
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader'
			}
		}, {
			test: /\.strand$/,
			use: 'raw-loader'
		}, {
			test: /\.css$/, // stylesheets
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
							require('autoprefixer')(),
							require('postcss-clean')()
						]
					}
				}
			]
		}, {
			test: /\.(png|svg)$/, // assets
			use: {
				loader: 'url-loader',
				options: {
					outputPath: 'assets/',
					limit: Infinity // bytes
				}
			}
		}]
	},
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new CleanWebpackPlugin(['public']), // cleans dist
		new HtmlWebpackPlugin({ // creates index.html
			title: package.description,
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			},
			minify: true,
			favicon: './src/assets/icon.png'
		})
	],
};
