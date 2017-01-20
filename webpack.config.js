var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['bootstrap-loader', 'es6-shim/es6-shim.js', 'reflect-metadata/Reflect.js', 'zone.js/dist/zone.js', './src/app/boot.ts']
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].[hash].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {   test: /\.html/,
                loader: 'html-loader?minimize=false'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'head'
        })
    ]
};