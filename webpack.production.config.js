var path = require('path');
var webpack = require("webpack");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: ["babel-polyfill", "./frontend/index.js"],
  output: {
    path: path.resolve(__dirname, 'public/static/js'),
    filename: 'live.[chunkhash:16].js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        // loader: 'babel-loader?presets[]=stage-0&presets[]=react'
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "latest",
              "react",
              "stage-0"         
            ],
            plugins: [
              "transform-runtime",
              "transform-es2015-block-scoping",
              // "transform-es3-property-literals",
              // "transform-es3-member-expression-literals"
            ]
          }
        } 
      },
      { 
        test: /\.css$/, // Only .css files
        include: /node_modules/,
        loader: [ 'style-loader', 'css-loader' ] // Run both loaders
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'my-manifest.json'
    }),
    new UglifyJSPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   mangle: false,
    //   output: {
    //     comments: false
    //   },
    //   'support-ie8': true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
    
  ]
  
};

module.exports = config;