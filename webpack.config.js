var path = require('path');
var webpack = require('webpack');

module.exports = { 
    entry: './src/JS/index.js',
    output: {
        path: __dirname,
        filename: 'build/js/project.bundle.js'
    },
    module: {   
        rules: [{
            test: /\.js$/, 
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }]
        },{
        	test: /\.css$/, 
        	use: ['style-loader', 'css-loader']
        }]
    },
    mode: 'development'
};