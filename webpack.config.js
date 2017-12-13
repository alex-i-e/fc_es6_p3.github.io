const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname);

const config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './src/[name].[chunkhash].js',
        // publicPath: "./src/"
        chunkFilename: "[id].js",
        // chunkFilename: "[chunkhash].js",
        sourceMapFilename: "sourcemaps/[file].map",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                }
            },
            {
                test: /\.css$/,
                // fallback: "style-loader",
                use: ExtractTextPlugin.extract([
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'])
            }
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        extensions: [".js", ".json", ".css"],
        // extensions that are used
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'}),
        new ExtractTextPlugin("styles.css")
    ]
    ,stats: {
        colors: true
    }
    ,devtool: 'source-map' // devtool: "eval",
};

module.exports = config;