const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const path = require('path');
const webpack = require('webpack');

const env = process.env;
const PROD = (env.NODE_ENV === 'production' || env.production);
const isProd = env.npm_lifecycle_event.indexOf(':prod') != -1;
const sourcePath = path.join(__dirname);

console.log('env.NODE_ENV = ', env.NODE_ENV);
console.log('env.production = ', env.production);
isProd ? console.log('isProd = ', isProd) : '';
PROD ? console.log('PROD = ', PROD) : '';

const config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: './src/[name].js',
        publicPath: ""
    },
    resolve: {
        extensions: ['.js']
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
                include: [
                    path.resolve(__dirname, "app")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5, // Must be greater than or equal to one
            minChunkSize: 1000
        }),
        new HtmlWebpackPlugin({template: './index.html'}),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        })
    ],
    devtool: isProd ? '' : 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        compress: true,
        // lazy: true,
        hot: true,
    }
};

isProd ? config.plugins
    .push(new MinifyPlugin(require("babel-preset-minify"), {})): '';

isProd ? config.plugins
    .push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: { warnings: false }
})): '';

module.exports = config;