/* */ 
(function(process) {
  'use strict';
  var browserSync = require('browser-sync').create();
  var path = require('path');
  var _ = require('lodash');
  var config = require('./config-defaults');
  module.exports = function start(opts, cb) {
    opts = opts || {};
    opts.argv = opts.argv || process.argv;
    opts.console = opts.console || console;
    cb = cb || function noop() {};
    var argv = require('minimist')(opts.argv.slice(2));
    var bsConfigName = argv.c || argv.config || 'bs-config';
    var bsConfigPath = path.resolve(bsConfigName);
    var overrides = {};
    try {
      overrides = require(bsConfigPath);
    } catch (err) {
      if (err.code && err.code === 'MODULE_NOT_FOUND') {
        opts.console.info('Did not detect a `bs-config.json` or `bs-config.js` override file.' + ' Using lite-server defaults...');
      } else {
        throw (err);
      }
    }
    _.merge(config, overrides);
    if (config.server.middleware) {
      config.server.middleware = _.compact(config.server.middleware);
    }
    opts.console.log('** browser-sync config **');
    opts.console.log(config);
    browserSync.init(config, cb);
    return browserSync;
  };
})(require('process'));
