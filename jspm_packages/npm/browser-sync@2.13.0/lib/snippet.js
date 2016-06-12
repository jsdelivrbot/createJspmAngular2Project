/* */ 
"use strict";
var connectUtils = require('./connect-utils');
var config = require('./config');
var lrSnippet = require('resp-modifier');
var path = require('path');
var _ = require('../lodash.custom');
var utils = require('./utils');
var fs = require('fs');
var snippetUtils = {
  isExcluded: function(url, excludeList) {
    var extension = path.extname(url);
    if (extension) {
      if (~url.indexOf("?")) {
        return true;
      }
      extension = extension.slice(1);
      return _.includes(excludeList, extension);
    }
    return false;
  },
  getRegex: function(snippet, options) {
    var fn = options.getIn(["rule", "fn"]);
    return {
      match: options.getIn(["rule", "match"]),
      fn: function(req, res, match) {
        return fn.apply(null, [snippet, match]);
      },
      once: true,
      id: "bs-snippet"
    };
  },
  getSnippetMiddleware: function(snippet, options, rewriteRules) {
    return lrSnippet.create(snippetUtils.getRules(snippet, options, rewriteRules));
  },
  getRules: function(snippet, options, rewriteRules) {
    var rules = [snippetUtils.getRegex(snippet, options)];
    if (rewriteRules) {
      rules = rules.concat(rewriteRules);
    }
    return {
      rules: rules,
      blacklist: utils.arrayify(options.get("blacklist")),
      whitelist: utils.arrayify(options.get("whitelist"))
    };
  },
  isOldIe: function(excludeList) {
    return function(req, res, next) {
      var ua = req.headers["user-agent"];
      var match = /MSIE (\d)\.\d/.exec(ua);
      if (match) {
        if (parseInt(match[1], 10) < 9) {
          if (!snippetUtils.isExcluded(req.url, excludeList)) {
            req.headers["accept"] = "text/html";
          }
        }
      }
      next();
    };
  },
  getClientJs: function(port, options) {
    var socket = snippetUtils.getSocketScript();
    var noConflictJs = "window.___browserSync___oldSocketIo = window.io;";
    return noConflictJs + socket + ";" + connectUtils.socketConnector(options);
  },
  getSocketScript: function() {
    return fs.readFileSync(path.join(__dirname, config.socketIoScript), "utf-8");
  }
};
module.exports.utils = snippetUtils;
