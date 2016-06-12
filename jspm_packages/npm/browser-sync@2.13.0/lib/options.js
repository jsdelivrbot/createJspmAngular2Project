/* */ 
"use strict";
var _ = require('../lodash.custom');
var Immutable = require('immutable');
var defaultConfig = require('./default-config');
module.exports.update = function(options) {
  return options.withMutations(function(item) {
    setMode(item);
    setScheme(item);
    setStartPath(item);
    setProxyWs(item);
    setServerOpts(item);
    setNamespace(item);
    fixSnippetOptions(item);
    setMiddleware(item);
    setOpen(item);
    if (item.get("uiPort")) {
      item.setIn(["ui", "port"], item.get("uiPort"));
    }
  });
};
function setProxyWs(item) {
  if (item.get("ws") && item.get("mode") === "proxy") {
    item.setIn(["proxy", "ws"], true);
  }
}
function setOpen(item) {
  var open = item.get("open");
  if (item.get("mode") === "snippet") {
    if (open !== "ui" && open !== "ui-external") {
      item.set("open", false);
    }
  }
}
function setMode(item) {
  item.set("mode", (function() {
    if (item.get("server")) {
      return "server";
    }
    if (item.get("proxy")) {
      return "proxy";
    }
    return "snippet";
  })());
}
function setScheme(item) {
  var scheme = "http";
  if (item.getIn(["server", "https"])) {
    scheme = "https";
  }
  if (item.get("https")) {
    scheme = "https";
  }
  if (item.getIn(["proxy", "url", "protocol"])) {
    if (item.getIn(["proxy", "url", "protocol"]) === "https:") {
      scheme = "https";
    }
  }
  item.set("scheme", scheme);
}
function setStartPath(item) {
  if (item.get("proxy")) {
    var path = item.getIn(["proxy", "url", "path"]);
    if (path !== "/") {
      item.set("startPath", path);
    }
  }
}
function setNamespace(item) {
  var namespace = item.getIn(["socket", "namespace"]);
  if (_.isFunction(namespace)) {
    item.setIn(["socket", "namespace"], namespace(defaultConfig.socket.namespace));
  }
}
function setServerOpts(item) {
  if (item.get("server")) {
    var indexarg = item.get("index") || item.getIn(["server", "index"]) || "index.html";
    var optPath = ["server", "serveStaticOptions"];
    if (item.get("directory")) {
      item.setIn(["server", "directory"], true);
    }
    if (!item.getIn(optPath)) {
      item.setIn(optPath, Immutable.Map({index: indexarg}));
    } else {
      if (!item.hasIn(optPath.concat(["index"]))) {
        item.setIn(optPath.concat(["index"]), indexarg);
      }
    }
    if (item.get("extensions")) {
      item.setIn(optPath.concat(["extensions"]), item.get("extensions"));
    }
  }
}
function fixSnippetOptions(item) {
  var ignorePaths = item.getIn(["snippetOptions", "ignorePaths"]);
  var includePaths = item.getIn(["snippetOptions", "whitelist"]);
  if (ignorePaths) {
    if (_.isString(ignorePaths)) {
      ignorePaths = [ignorePaths];
    }
    ignorePaths = ignorePaths.map(ensureSlash);
    item.setIn(["snippetOptions", "blacklist"], Immutable.List(ignorePaths));
  }
  if (includePaths) {
    includePaths = includePaths.map(ensureSlash);
    item.setIn(["snippetOptions", "whitelist"], Immutable.List(includePaths));
  }
}
function ensureSlash(item) {
  if (item[0] !== "/") {
    return "/" + item;
  }
  return item;
}
function setMiddleware(item) {
  var mw = getMiddlwares(item);
  item.set("middleware", mw);
}
function getMiddlwares(item) {
  var mw = item.get("middleware");
  var serverMw = item.getIn(["server", "middleware"]);
  var proxyMw = item.getIn(["proxy", "middleware"]);
  var list = Immutable.List([]);
  if (mw) {
    return listMerge(list, mw);
  }
  if (serverMw) {
    return listMerge(list, serverMw);
  }
  if (proxyMw) {
    return listMerge(list, proxyMw);
  }
  return list;
}
function isList(item) {
  return Immutable.List.isList(item);
}
function listMerge(list, item) {
  if (_.isFunction(item)) {
    list = list.push(item);
  }
  if (isList(item) && item.size) {
    list = list.merge(item);
  }
  return list;
}
