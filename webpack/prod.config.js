const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const customPath = path.join(__dirname, "./customPublicPath");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: {
        newtab: [customPath, path.join(__dirname, "../chrome/extension/newtab")],
        popup: [customPath, path.join(__dirname, "../chrome/extension/popup")],
        background: [customPath, path.join(__dirname, "../chrome/extension/background")],
        inject: [customPath, path.join(__dirname, "../chrome/extension/inject")]
    },
    output: {
        path: path.join(__dirname, "../build/js"),
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
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
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
                exclude: /node_modules/
                // options: {
                // 	presets: ["react-hmre"]
                // }
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
};
