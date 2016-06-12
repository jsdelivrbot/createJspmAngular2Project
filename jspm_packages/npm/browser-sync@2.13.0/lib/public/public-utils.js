/* */ 
"use strict";
var _ = require('../../lodash.custom');
module.exports = {
  emitChangeEvent: function emitChangeEvent(emitter, path, log) {
    emitter.emit("file:changed", {
      path: path,
      log: log,
      namespace: "core"
    });
  },
  emitBrowserReload: function emitChangeEvent(emitter) {
    emitter.emit("browser:reload");
  },
  emitStreamChangedEvent: function(emitter, changed) {
    emitter.emit("stream:changed", {changed: changed});
  },
  isStreamArg: function(name, args) {
    if (name === "stream") {
      return true;
    }
    if (name !== "reload") {
      return false;
    }
    var firstArg = args[0];
    if (_.isObject(firstArg)) {
      if (!Array.isArray(firstArg) && Object.keys(firstArg).length) {
        return firstArg.stream === true;
      }
    }
    return false;
  }
};
