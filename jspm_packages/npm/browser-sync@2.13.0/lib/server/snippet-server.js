/* */ 
"use strict";
var connect = require('connect');
var serverUtils = require('./utils');
module.exports = function createSnippetServer(bs, scripts) {
  var app = serverUtils.getBaseApp(bs, bs.options, scripts);
  return serverUtils.getServer(app, bs.options);
};
