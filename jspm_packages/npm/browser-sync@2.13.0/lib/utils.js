/* */ 
(function(process) {
  "use strict";
  var _ = require('../lodash.custom');
  var devIp = require('dev-ip')();
  var Immutable = require('immutable');
  var portScanner = require('portscanner');
  var path = require('path');
  var List = require('immutable').List;
  var UAParser = require('ua-parser-js');
  var parser = new UAParser();
  var utils = {
    getHostIp: function(options, devIp) {
      if (options) {
        var host = options.get("host");
        if (host && host !== "localhost") {
          return host;
        }
        if (options.get("detect") === false || !devIp.length) {
          return false;
        }
      }
      return devIp.length ? devIp[0] : false;
    },
    getUrlOptions: function(options) {
      var scheme = options.get("scheme");
      var port = options.get("port");
      var urls = {};
      if (options.get("online") === false) {
        urls.local = utils.getUrl(scheme + "://localhost:" + port, options);
        return Immutable.fromJS(urls);
      }
      var external = utils.xip(utils.getHostIp(options, devIp), options);
      var localhost = "localhost";
      if (options.get("xip")) {
        localhost = "127.0.0.1";
      }
      localhost = utils.xip(localhost, options);
      return Immutable.fromJS(utils.getUrls(external, localhost, scheme, options));
    },
    getUrl: function(url, options) {
      var prefix = "/";
      var startPath = options.get("startPath");
      if (startPath) {
        if (startPath.charAt(0) === "/") {
          prefix = "";
        }
        url = url + prefix + startPath;
      }
      return url;
    },
    getUrls: function(external, local, scheme, options) {
      var urls = {local: utils.getUrl(utils._makeUrl(scheme, local, options.get("port")), options)};
      if (external !== local) {
        urls.external = utils.getUrl(utils._makeUrl(scheme, external, options.get("port")), options);
      }
      return urls;
    },
    _makeUrl: function(scheme, host, port) {
      return scheme + "://" + host + ":" + port;
    },
    getPorts: function(options, cb) {
      var port = options.get("port");
      var ports = options.get("ports");
      var max;
      if (ports) {
        port = ports.get("min");
        max = ports.get("max") || null;
      }
      utils.getPort(port, max, cb);
    },
    getPort: function(port, max, cb) {
      portScanner.findAPortNotInUse(port, max, {
        host: "localhost",
        timeout: 1000
      }, cb);
    },
    getUaString: function(ua) {
      return parser.setUA(ua).getBrowser();
    },
    openBrowser: function(url, options) {
      var open = options.get("open");
      var browser = options.get("browser");
      if (_.isString(open)) {
        if (options.getIn(["urls", open])) {
          url = options.getIn(["urls", open]);
        }
      }
      if (open) {
        if (browser !== "default") {
          if (utils.isList(browser)) {
            browser.forEach(function(browser) {
              utils.open(url, browser);
            });
          } else {
            utils.open(url, browser);
          }
        } else {
          utils.open(url);
        }
      }
    },
    open: function(url, name) {
      require('opn')(url, {app: name || null});
    },
    fail: function(kill, errMessage, cb) {
      if (kill) {
        if (_.isFunction(cb)) {
          if (errMessage.message) {
            cb(errMessage);
          } else {
            cb(new Error(errMessage));
          }
        }
        process.exit(1);
      }
    },
    xip: function(host, options) {
      var suffix = options.get("hostnameSuffix");
      if (options.get("xip")) {
        return host + ".xip.io";
      }
      if (suffix) {
        return host + suffix;
      }
      return host;
    },
    willCauseReload: function(needles, haystack) {
      return needles.some(function(needle) {
        return !_.includes(haystack, path.extname(needle).replace(".", ""));
      });
    },
    isList: Immutable.List.isList,
    isMap: Immutable.List.isMap,
    getConfigErrors: function(options) {
      var messages = require('./config').errors;
      var errors = [];
      if (options.get("server") && options.get("proxy")) {
        errors.push(messages["server+proxy"]);
      }
      if (options.get("https") && options.get("proxy")) {
        if (options.getIn(["proxy", "url", "protocol"]) !== "https:") {
          errors.push([messages["proxy+https"], options.getIn(["proxy", "target"])].join(" "));
        }
      }
      return errors;
    },
    verifyConfig: function(options, cb) {
      var errors = utils.getConfigErrors(options);
      if (errors.length) {
        utils.fail(true, errors.join("\n"), cb);
        return false;
      }
      return true;
    },
    defaultCallback: function(err) {
      if (err && err.message) {
        console.error(err.message);
      }
    },
    eachSeries: function(arr, iterator, callback) {
      callback = callback || function() {};
      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], function(err) {
          if (err) {
            callback(err);
            callback = function() {};
          } else {
            ++completed;
            if (completed >= arr.length) {
              callback();
            } else {
              iterate();
            }
          }
        });
      };
      iterate();
    },
    arrayify: function(incoming) {
      if (List.isList(incoming)) {
        return incoming.toArray();
      }
      return [].concat(incoming).filter(Boolean);
    }
  };
  module.exports = utils;
  module.exports.portscanner = portScanner;
  module.exports.UAParser = UAParser;
  module.exports.connect = require('connect');
  module.exports.devIp = devIp;
  module.exports.serveStatic = require('serve-static');
  module.exports.easyExtender = require('easy-extender');
})(require('process'));
