var path = require('path');
var webpack = require('webpack');

module.exports = { 
    entry: './src/JS/RobotSimulation/index.js',
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
        	test: /\.less$/, 
        	use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    mode: 'development'
};