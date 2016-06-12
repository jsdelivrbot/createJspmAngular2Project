/* */ 
"use strict";
var httpProxy = require('http-proxy');
var utils = require('./utils');
var proxyUtils = require('./proxy-utils');
var Immutable = require('immutable');
var Map = require('immutable').Map;
var List = require('immutable').List;
var defaultHttpProxyOptions = Map({
  changeOrigin: true,
  autoRewrite: true,
  secure: false,
  ws: true
});
var defaultCookieOptions = Map({stripDomain: true});
var ProxyOption = Immutable.Record({
  route: "",
  target: "",
  rewriteRules: true,
  proxyReq: List([]),
  proxyRes: List([]),
  errHandler: undefined,
  url: Map({}),
  proxyOptions: Map(defaultHttpProxyOptions),
  cookies: Map(defaultCookieOptions),
  ws: false,
  middleware: List([]),
  reqHeaders: undefined
});
module.exports = function createProxyServer(bs, scripts) {
  var opt = new ProxyOption().mergeDeep(bs.options.get("proxy"));
  var proxy = httpProxy.createProxyServer(opt.get("proxyOptions").set("target", opt.get("target")).toJS());
  var target = opt.get("target");
  var proxyReq = getProxyReqFunctions(opt.get("proxyReq"), opt, bs);
  var proxyRes = getProxyResFunctions(opt.get("proxyRes"), opt);
  var middlewareAdded = bs.options.update("middleware", function(mw) {
    return mw.concat({
      id: "Browsersync Proxy",
      route: opt.get("route"),
      handle: function(req, res) {
        proxy.web(req, res, {target: target});
      }
    });
  });
  var app = utils.getBaseApp(bs, middlewareAdded, scripts);
  var browserSyncServer = utils.getServer(app, bs.options);
  browserSyncServer.proxy = proxy;
  if (opt.get("ws")) {
    browserSyncServer.server.on("upgrade", function(req, socket, head) {
      proxy.ws(req, socket, head);
    });
  }
  applyFns("proxyReq", proxyReq);
  applyFns("proxyRes", proxyRes);
  proxy.on("error", function(err) {
    if (typeof opt.get("errHandler") === "function") {
      opt.get("errHandler").call(null, err);
    }
  });
  function applyFns(name, fns) {
    if (!List.isList(fns))
      fns = [fns];
    proxy.on(name, function() {
      var args = arguments;
      fns.forEach(function(fn) {
        if (typeof fn === "function") {
          fn.apply(null, args);
        }
      });
    });
  }
  return browserSyncServer;
};
function getProxyResFunctions(resFns, opt) {
  if (opt.getIn(["cookies", "stripDomain"])) {
    return resFns.push(proxyUtils.checkCookies);
  }
  return resFns;
}
function getProxyReqFunctions(reqFns, opt, bs) {
  var reqHeaders = opt.getIn(["reqHeaders"]);
  if (!reqHeaders) {
    return reqFns;
  }
  if (typeof reqHeaders === "function") {
    var output = reqHeaders.call(bs, opt.toJS());
    if (Object.keys(output).length) {
      return reqFns.concat(function(proxyReq) {
        Object.keys(output).forEach(function(key) {
          proxyReq.setHeader(key, output[key]);
        });
      });
    }
  }
  if (Map.isMap(reqHeaders)) {
    return reqFns.concat(function(proxyReq) {
      reqHeaders.forEach(function(value, key) {
        proxyReq.setHeader(key, value);
      });
    });
  }
  return reqFns;
}
