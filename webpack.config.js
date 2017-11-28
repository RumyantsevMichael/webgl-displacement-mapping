'use strict';

const path = require('path');

module.exports = {
    entry: './src/index.js',

    devtool: '#sourcemap',

    output: {
        path: path.resolve(__dirname, './'),
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.glsl$/,
                use: 'raw-loader'
            }
        ]
    } 
};
