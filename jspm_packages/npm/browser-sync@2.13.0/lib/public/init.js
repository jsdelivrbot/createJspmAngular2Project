/* */ 
"use strict";
var _ = require('../../lodash.custom');
var merge = require('../cli/cli-options').merge;
module.exports = function(browserSync, name, pjson) {
  return function() {
    var args = require('../args')(_.toArray(arguments));
    if (browserSync.active) {
      return args.cb(new Error("Instance: " + name + " is already running!"));
    }
    args.config.version = pjson.version;
    return browserSync.init(merge(args.config), args.cb);
  };
};
