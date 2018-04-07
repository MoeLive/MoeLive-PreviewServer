var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var publicPath = 'http://127.0.0.1:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'; //加载热跟新中间件

var config = {
  entry: [ hotMiddlewareScript, './frontend/index.js'], //使用热更新功能
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'bundle.js',
    publicPath: publicPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        include: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  },
  /* 创建热更新热加载组件 */
  plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(), //用webpack1.0版本时才需要
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;