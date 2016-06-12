/* */ 
const webpack = require('webpack');
const common = require('./webpack.common.config');
common.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {warnings: false},
  mangle: true
}));
common.resolve = {alias: {
    'react': 'react-lite',
    'react-dom': 'react-lite'
  }};
module.exports = common;
