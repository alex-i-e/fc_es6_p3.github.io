const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname);

const config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        // plugins: [
                        //     require('@babel/transform-runtime'),
                        //     require('@babel/plugin-transform-regenerator'),
                        //     require('@babel/syntax-async-functions')
                        // ]
                    }
                },
                include: sourcePath
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
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'}),
        new ExtractTextPlugin("styles.css")
    ]
    // ,stats: {
    //     colors: true
    // }
    ,devtool: 'source-map'
};

module.exports = config;