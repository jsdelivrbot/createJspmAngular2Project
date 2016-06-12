/* */ 
"use strict";
var utils = require('./utils');
var fileUtils = require('./file-utils');
module.exports = function(bs) {
  var events = {
    "file:changed": function(data) {
      fileUtils.changedFile(bs, data);
    },
    "file:reload": function(data) {
      bs.doFileReload(data);
    },
    "browser:reload": function() {
      bs.doBrowserReload();
    },
    "browser:notify": function(data) {
      bs.io.sockets.emit("browser:notify", data);
    },
    "service:running": function(data) {
      var mode = bs.options.get("mode");
      var open = bs.options.get("open");
      if (mode === "proxy" || mode === "server" || open === "ui" || open === "ui-external") {
        utils.openBrowser(data.url, bs.options);
      }
      if (bs.watchers) {
        bs.events.emit("file:watching", bs.watchers);
      }
    },
    "options:set": function(data) {
      if (bs.io) {
        bs.io.sockets.emit("options:set", data);
      }
    },
    "plugins:configure": function(data) {
      if (data.active) {
        bs.pluginManager.enablePlugin(data.name);
      } else {
        bs.pluginManager.disablePlugin(data.name);
      }
      bs.setOption("userPlugins", bs.getUserPlugins());
    },
    "plugins:opts": function(data) {
      if (bs.pluginManager.pluginOptions[data.name]) {
        bs.pluginManager.pluginOptions[data.name] = data.opts;
        bs.setOption("userPlugins", bs.getUserPlugins());
      }
    }
  };
  Object.keys(events).forEach(function(event) {
    bs.events.on(event, events[event]);
  });
};
