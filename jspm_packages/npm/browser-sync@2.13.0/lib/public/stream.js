/* */ 
"use strict";
var path = require('path');
var micromatch = require('micromatch');
var utils = require('./public-utils');
module.exports = function(emitter) {
  function browserSyncThroughStream(opts) {
    opts = opts || {};
    var emitted = false;
    var Transform = require('stream').Transform;
    var reload = new Transform({objectMode: true});
    var changed = [];
    reload._transform = function(file, encoding, next) {
      var stream = this;
      function end() {
        stream.push(file);
        next();
      }
      if (opts.match) {
        if (!micromatch(file.path, opts.match, {dot: true}).length) {
          return end();
        }
      }
      if (opts.once === true && !emitted) {
        utils.emitBrowserReload(emitter);
        emitted = true;
      } else {
        if (opts.once === true && emitted) {} else {
          if (file.path) {
            emitted = true;
            utils.emitChangeEvent(emitter, file.path, false);
            changed.push(path.basename(file.path));
          }
        }
      }
      end();
    };
    reload._flush = function(next) {
      if (changed.length) {
        utils.emitStreamChangedEvent(emitter, changed);
      }
      next();
    };
    return reload;
  }
  return browserSyncThroughStream;
};
