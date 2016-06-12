/* */ 
"use strict";
var connect = require('connect');
var serverUtils = require('./utils');
var resolve = require('path').resolve;
var utils = require('../utils');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
module.exports = function createServer(bs, scripts) {
  var options = bs.options;
  var server = options.get("server");
  var basedirs = utils.arrayify(server.get("baseDir"));
  var serveStaticOptions = server.get("serveStaticOptions").toJS();
  var _serveStatic = 0;
  var _routes = 0;
  var middlewareAdded = bs.options.update("middleware", function(mw) {
    if (!server.get("directory")) {
      return mw;
    }
    return mw.concat({
      route: "",
      handle: serveIndex(resolve(basedirs[0]), {icons: true}),
      id: "Browsersync Server Directory Middleware"
    });
  }).update("middleware", function(mw) {
    return mw.concat(basedirs.map(function(root) {
      return {
        route: "",
        id: "Browsersync Server ServeStatic Middleware - " + _serveStatic++,
        handle: serveStatic(resolve(root), serveStaticOptions)
      };
    }));
  }).update("middleware", function(mw) {
    if (!server.get("routes")) {
      return mw;
    }
    return mw.concat(server.get("routes").map(function(root, urlPath) {
      if (urlPath[urlPath.length - 1] === "/") {
        urlPath = urlPath.slice(0, -1);
      }
      return {
        route: urlPath,
        id: "Browsersync Server Routes Middleware - " + _routes++,
        handle: serveStatic(resolve(root))
      };
    }));
  });
  var app = serverUtils.getBaseApp(bs, middlewareAdded, scripts);
  return serverUtils.getServer(app, bs.options);
};
