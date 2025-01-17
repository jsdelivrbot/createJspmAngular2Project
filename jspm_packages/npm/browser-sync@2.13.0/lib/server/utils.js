/* */ 
"use strict";
var fs = require('fs');
var filePath = require('path');
var connect = require('connect');
var http = require('http');
var https = require('https');
var Map = require('immutable').Map;
var snippet = require('../snippet').utils;
var utils = {
  getKeyAndCert: function(options) {
    return {
      key: fs.readFileSync(options.getIn(["https", "key"]) || filePath.join(__dirname, "certs/server.key")),
      cert: fs.readFileSync(options.getIn(["https", "cert"]) || filePath.join(__dirname, "certs/server.crt"))
    };
  },
  getPFX: function(filePath) {
    return {pfx: fs.readFileSync(filePath)};
  },
  getServer: function(app, options) {
    return {
      server: (function() {
        if (options.get("scheme") === "https") {
          var pfxPath = options.getIn(["https", "pfx"]);
          return pfxPath ? https.createServer(utils.getPFX(pfxPath), app) : https.createServer(utils.getKeyAndCert(options), app);
        }
        return http.createServer(app);
      })(),
      app: app
    };
  },
  getBaseApp: function(bs, options, scripts) {
    var app = connect();
    app.stack.push({
      id: "Browsersync IE8 Support",
      route: "",
      handle: snippet.isOldIe(options.get("excludedFileTypes").toJS())
    }, {
      id: "Browsersync Response Modifier",
      route: "",
      handle: utils.getSnippetMiddleware(bs)
    }, {
      id: "Browsersync Client - versioned",
      route: bs.options.getIn(["scriptPaths", "versioned"]),
      handle: scripts
    }, {
      id: "Browsersync Client",
      route: bs.options.getIn(["scriptPaths", "path"]),
      handle: scripts
    });
    options.get("middleware").map(function(item) {
      if (Map.isMap(item)) {
        return item.toJS();
      }
      if (typeof item === "function") {
        return {
          route: "",
          handle: item
        };
      }
      if ((item.route !== undefined) && item.handle) {
        return item;
      }
    }).forEach(function(item) {
      app.stack.push(item);
    });
    return app;
  },
  getSnippetMiddleware: function(bs) {
    if (bs.options.get("proxy")) {
      var rule = require('./proxy-utils').rewriteLinks(bs.options.getIn(["proxy", "url"]).toJS());
      bs.snippetMw.opts.rules.push(rule);
    }
    return bs.snippetMw.middleware;
  }
};
module.exports = utils;
