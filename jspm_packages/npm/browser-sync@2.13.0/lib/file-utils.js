/* */ 
"use strict";
var _ = require('../lodash.custom');
var fileUtils = {
  changedFile: function(bs, data) {
    if (_.isUndefined(data.event)) {
      data.event = "change";
    }
    if (data.event === "change") {
      if (!bs.paused && data.namespace === "core") {
        bs.events.emit("file:reload", fileUtils.getFileInfo(data, bs.options));
      }
    }
  },
  getFileInfo: function(data, options) {
    data.ext = require('path').extname(data.path).slice(1);
    data.basename = require('path').basename(data.path);
    var obj = {
      ext: data.ext,
      path: data.path,
      basename: data.basename,
      type: "inject"
    };
    if (!_.includes(options.get("injectFileTypes").toJS(), obj.ext)) {
      obj.url = obj.path;
      obj.type = "reload";
    }
    obj.path = data.path;
    obj.log = data.log;
    return obj;
  }
};
module.exports = fileUtils;
