'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const seedConfig = Object.assign({}, require('./seed-config.defaults'), require('../package.json').seedConfig);

module.exports = merge(webpackCommon, {
    entry: {
        main: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${seedConfig.port}`,
            'webpack/hot/only-dev-server',
            './src/main.jsx'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    devtool: 'inline-source-map',

    devServer: {
        port: seedConfig.port,
        inline: true,
        hot: true,
        historyApiFallback: true,
        stats: 'minimal'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            name: 'vendor'
        })
    ]
});
