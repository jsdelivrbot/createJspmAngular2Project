/* */ 
"use strict";
var UI = require('./lib/UI');
var config = require('./lib/config');
var Events = require('events').EventEmitter;
module.exports.hooks = {"client:js": fileContent(config.defaults.clientJs)};
module.exports["plugin"] = function(opts, bs, cb) {
  var ui = new UI(opts, bs, new Events());
  bs.setOption("session", new Date().getTime());
  ui.cb = cb || function() {};
  ui.init();
  return ui;
};
module.exports["plugin:name"] = config.defaults.pluginName;
function getPath(filepath) {
  return require('path').join(__dirname, filepath);
}
function fileContent(filepath) {
  return require('fs').readFileSync(getPath(filepath));
}
