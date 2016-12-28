const webpack           = require('webpack');
const path              = require('path');
const CleanPlugin       = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Paths = {
	app  : path.resolve(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

module.exports = {
	cache  : true,
	devtool: 'cheap-eval',
	entry  : {
		app: Paths.app
	},
	output : {
		path      : Paths.build,
		filename  : '[name].[chunkhash].js',
		publicPath: '/'
	},
	module : {
		loaders: [
			{
				test   : /\.jsx?$/,
				include: Paths.app,
				exclude: /node_modules/,
				loader : 'babel?cacheDirectory=true'
			},
			{
				test   : /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			},
			{
				test   : /\.css$/,
				exclude: /node_modules/,
				loaders: [ 'style', 'css' ]
			},
			{
				test  : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
			},
			{
				test  : /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			}, {
				test  : /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			}, {
				test  : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
			}, {
				test  : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file?name=fonts/[name].[ext]"
			}
		]
	},
	plugins: [
		new CleanPlugin([ Paths.build ]),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new HtmlWebpackPlugin({
			template  : "template.ejs",
			title     : "Password Generator Extension",
			appMountId: "app",
			filename  : "popup.html",
			inject    : false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings : false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new CopyWebpackPlugin([
			{
				from : path.resolve(__dirname, 'manifest.json'),
				to : Paths.build
			},
			{
				from : path.resolve(__dirname, 'icon.png'),
				to : Paths.build
			}
		])
	]
};