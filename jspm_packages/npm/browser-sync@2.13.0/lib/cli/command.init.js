/* */ 
(function(process) {
  "use strict";
  var info = require('./cli-info');
  module.exports = function(opts) {
    info.makeConfig(process.cwd(), opts.cb);
  };
})(require('process'));
