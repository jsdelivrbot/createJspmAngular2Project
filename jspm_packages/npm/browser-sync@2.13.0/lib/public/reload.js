/* */ 
"use strict";
var utils = require('../utils');
var publicUtils = require('./public-utils');
var _ = require('../../lodash.custom');
var defaultConfig = require('../default-config');
var stream = require('./stream');
module.exports = function(emitter) {
  function browserSyncReload(opts) {
    if (_.isObject(opts)) {
      if (!Array.isArray(opts) && Object.keys(opts).length) {
        if (opts.stream === true) {
          return stream(emitter)(opts);
        }
      }
    }
    if (typeof opts === "string" && opts !== "undefined") {
      return publicUtils.emitChangeEvent(emitter, opts, true);
    }
    if (Array.isArray(opts)) {
      if (utils.willCauseReload(opts, defaultConfig.injectFileTypes)) {
        return publicUtils.emitBrowserReload(emitter);
      }
      return opts.forEach(function(filepath) {
        publicUtils.emitChangeEvent(emitter, filepath, true);
      });
    }
    return publicUtils.emitBrowserReload(emitter);
  }
  return browserSyncReload;
};
