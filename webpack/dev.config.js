const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const host = "localhost";
const port = 3000;
const customPath = path.join(__dirname, "./customPublicPath");
const hotScript = "webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true";

function resolve(dir) {
	return path.join(__dirname, "..", dir);
}

const baseDevConfig = () => ({
	devtool: "eval-cheap-module-source-map",
	entry: {
		newtab: [customPath, hotScript, path.join(__dirname, "../chrome/extension/newtab")],
		popup: [customPath, hotScript, path.join(__dirname, "../chrome/extension/popup")],
		background: [customPath, hotScript, path.join(__dirname, "../chrome/extension/background")]
	},
	devMiddleware: {
		publicPath: `http://${host}:${port}/js`,
		stats: {
			colors: true
		},
		noInfo: true,
		headers: { "Access-Control-Allow-Origin": "*" }
	},
	hotMiddleware: {
		path: "/js/__webpack_hmr"
	},
	output: {
		path: path.join(__dirname, "../dev/js"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	resolve: {
		extensions: ["*", ".js", ".json"],
		alias: {
			"@": resolve("src")
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
		new webpack.DefinePlugin({
			__HOST__: `'${host}'`,
			__PORT__: port,
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		new webpack.ProvidePlugin({
			React: "react"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["react-hmre"]
				}
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [autoprefixer]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "less-loader",
						options: {
							javascriptEnabled: true,
							modules: true,
							localIndexName: "[name]__[local]___[hash:base64:5]"
						}
					}
					// "postcss-loader"
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "img/[name].[ext]"
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "media/[name].[ext]"
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "fonts/[name].[ext]"
				}
			}
		]
	}
});

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = [
	customPath,
	path.join(__dirname, "../chrome/extension/inject")
];
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.rules[0].options;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
	path: path.join(__dirname, "../dev/js"),
	filename: "inject.bundle.js"
};
const appConfig = baseDevConfig();

module.exports = [
	injectPageConfig,
	appConfig
];
