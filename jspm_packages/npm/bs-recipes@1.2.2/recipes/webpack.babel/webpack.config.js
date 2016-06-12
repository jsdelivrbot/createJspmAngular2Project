/* */ 
var webpack = require('webpack');
var path = require('path');
module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  entry: ['./src/main'],
  output: {
    path: path.join(__dirname, 'app'),
    publicPath: '/',
    filename: 'dist/bundle.js'
  },
  plugins: [new webpack.optimize.OccurenceOrderPlugin(), new webpack.NoErrorsPlugin()],
  module: {loaders: [{
      loader: "babel-loader",
      test: /\.jsx?$/,
      exclude: /node_modules/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0']
      }
    }]}
};
