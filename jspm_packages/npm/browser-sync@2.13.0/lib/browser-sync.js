/* */ 
(function(process) {
  "use strict";
  var hooks = require('./hooks');
  var asyncTasks = require('./async-tasks');
  var config = require('./config');
  var connectUtils = require('./connect-utils');
  var utils = require('./utils');
  var logger = require('./logger');
  var eachSeries = utils.eachSeries;
  var _ = require('../lodash.custom');
  var EE = require('easy-extender');
  var defaultPlugins = {
    "logger": logger,
    "socket": require('./sockets'),
    "file:watcher": require('./file-watcher'),
    "server": require('./server/index'),
    "tunnel": require('./tunnel'),
    "client:script": require('browser-sync-client'),
    "UI": require('browser-sync-ui')
  };
  var BrowserSync = function(emitter) {
    var bs = this;
    bs.cwd = process.cwd();
    bs.active = false;
    bs.paused = false;
    bs.config = config;
    bs.utils = utils;
    bs.events = bs.emitter = emitter;
    bs._userPlugins = [];
    bs._reloadQueue = [];
    bs._cleanupTasks = [];
    bs._browserReload = false;
    bs.pluginManager = new EE(defaultPlugins, hooks);
  };
  BrowserSync.prototype.callback = function(name) {
    var bs = this;
    var cb = bs.options.getIn(["callbacks", name]);
    if (_.isFunction(cb)) {
      cb.apply(bs.publicInstance, _.toArray(arguments).slice(1));
    }
  };
  BrowserSync.prototype.init = function(options, cb) {
    var bs = this;
    bs.cb = cb || utils.defaultCallback;
    if (!utils.verifyConfig(options, bs.cb)) {
      return;
    }
    bs._options = options;
    bs.options = require('./options').update(options);
    bs.pluginManager.init();
    bs.logger = bs.pluginManager.get("logger")(bs.events, bs);
    bs.debugger = bs.logger.clone({useLevelPrefixes: true});
    bs.debug = bs.debugger.debug;
    eachSeries(asyncTasks, taskRunner(bs), tasksComplete(bs));
    return this;
  };
  function taskRunner(bs) {
    return function(item, cb) {
      bs.debug("-> {yellow:Starting Step: " + item.step);
      item.fn(bs, executeTask);
      function executeTask(err, out) {
        if (err) {
          return cb(err);
        }
        if (out) {
          handleOut(bs, out);
        }
        bs.debug("+  {green:Step Complete: " + item.step);
        cb();
      }
    };
  }
  function handleOut(bs, out) {
    if (out.options) {
      setOptions(bs, out.options);
    }
    if (out.optionsIn) {
      out.optionsIn.forEach(function(item) {
        bs.setOptionIn(item.path, item.value);
      });
    }
    if (out.instance) {
      Object.keys(out.instance).forEach(function(key) {
        bs[key] = out.instance[key];
      });
    }
  }
  function setOptions(bs, options) {
    if (Object.keys(options).length > 1) {
      bs.setMany(function(item) {
        Object.keys(options).forEach(function(key) {
          item.set(key, options[key]);
          return item;
        });
      });
    } else {
      Object.keys(options).forEach(function(key) {
        bs.setOption(key, options[key]);
      });
    }
  }
  function tasksComplete(bs) {
    return function(err) {
      if (err) {
        bs.logger.setOnce("useLevelPrefixes", true).error(err.message);
      }
      bs.active = true;
      bs.events.emit("init", bs);
      bs.events.emit("service:running", {
        options: bs.options,
        baseDir: bs.options.getIn(["server", "baseDir"]),
        type: bs.options.get("mode"),
        port: bs.options.get("port"),
        url: bs.options.getIn(["urls", "local"]),
        urls: bs.options.get("urls").toJS(),
        tunnel: bs.options.getIn(["urls", "tunnel"])
      });
      bs.callback("ready", null, bs);
      bs.cb(null, bs);
    };
  }
  BrowserSync.prototype.registerPlugin = function(module, opts, cb) {
    var bs = this;
    bs.pluginManager.registerPlugin(module, opts, cb);
    if (module["plugin:name"]) {
      bs._userPlugins.push(module);
    }
  };
  BrowserSync.prototype.getUserPlugin = function(name) {
    var bs = this;
    var items = bs.getUserPlugins(function(item) {
      return item["plugin:name"] === name;
    });
    if (items && items.length) {
      return items[0];
    }
    return false;
  };
  BrowserSync.prototype.getUserPlugins = function(filter) {
    var bs = this;
    filter = filter || function() {
      return true;
    };
    bs.userPlugins = bs._userPlugins.filter(filter).map(function(plugin) {
      return {
        name: plugin["plugin:name"],
        active: plugin._enabled,
        opts: bs.pluginManager.pluginOptions[plugin["plugin:name"]]
      };
    });
    return bs.userPlugins;
  };
  BrowserSync.prototype.getMiddleware = function(type) {
    var types = {
      "connector": connectUtils.socketConnector(this.options),
      "socket-js": require('./snippet').utils.getSocketScript()
    };
    if (type in types) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        res.end(types[type]);
      };
    }
  };
  var _serveFileCount = 0;
  BrowserSync.prototype.serveFile = function(path, props) {
    var bs = this;
    var mode = bs.options.get("mode");
    var entry = {
      handle: function(req, res) {
        res.setHeader("Content-Type", props.type);
        res.end(props.content);
      },
      id: "Browsersync - " + _serveFileCount++,
      route: path
    };
    bs._addMiddlewareToStack(entry);
  };
  BrowserSync.prototype._addMiddlewareToStack = function(entry) {
    var bs = this;
    if (bs.options.get("mode") === "proxy") {
      bs.app.stack.splice(bs.app.stack.length - 1, 0, entry);
    } else {
      bs.app.stack.push(entry);
    }
  };
  var _addMiddlewareCount = 0;
  BrowserSync.prototype.addMiddleware = function(route, handle, opts) {
    var bs = this;
    if (!bs.app) {
      return;
    }
    opts = opts || {};
    if (!opts.id) {
      opts.id = "bs-mw-" + _addMiddlewareCount++;
    }
    if (route === "*") {
      route = "";
    }
    var entry = {
      id: opts.id,
      route: route,
      handle: handle
    };
    if (opts.override) {
      return bs.app.stack.unshift(entry);
    }
    bs._addMiddlewareToStack(entry);
  };
  BrowserSync.prototype.removeMiddleware = function(id) {
    var bs = this;
    if (!bs.app) {
      return;
    }
    bs.app.stack = bs.app.stack.filter(function(item) {
      if (!item.id) {
        return true;
      }
      return item.id !== id;
    });
    return bs.app;
  };
  BrowserSync.prototype.getSocketConnector = function(opts) {
    var bs = this;
    return function(req, res) {
      res.setHeader("Content-Type", "text/javascript");
      res.end(bs.getExternalSocketConnector(opts));
    };
  };
  BrowserSync.prototype.getExternalSocketConnector = function(opts) {
    var bs = this;
    return connectUtils.socketConnector(bs.options.withMutations(function(item) {
      item.set("socket", item.get("socket").merge(opts));
      if (!bs.options.getIn(["proxy", "ws"])) {
        item.set("mode", "snippet");
      }
    }));
  };
  BrowserSync.prototype.getSocketIoScript = function() {
    return require('./snippet').utils.getSocketScript();
  };
  BrowserSync.prototype.getOption = function(name) {
    this.debug("Getting option: {magenta:%s", name);
    return this.options.get(name);
  };
  BrowserSync.prototype.getOptionIn = function(path) {
    this.debug("Getting option via path: {magenta:%s", path);
    return this.options.getIn(path);
  };
  BrowserSync.prototype.getOptions = function() {
    return this.options;
  };
  BrowserSync.prototype.getLogger = logger.getLogger;
  BrowserSync.prototype.setOption = function(name, value, opts) {
    var bs = this;
    opts = opts || {};
    bs.debug("Setting Option: {cyan:%s} - {magenta:%s", name, value.toString());
    bs.options = bs.options.set(name, value);
    if (!opts.silent) {
      bs.events.emit("options:set", {
        path: name,
        value: value,
        options: bs.options
      });
    }
    return this.options;
  };
  BrowserSync.prototype.setOptionIn = function(path, value, opts) {
    var bs = this;
    opts = opts || {};
    bs.debug("Setting Option: {cyan:%s} - {magenta:%s", path.join("."), value.toString());
    bs.options = bs.options.setIn(path, value);
    if (!opts.silent) {
      bs.events.emit("options:set", {
        path: path,
        value: value,
        options: bs.options
      });
    }
    return bs.options;
  };
  BrowserSync.prototype.setMany = function(fn, opts) {
    var bs = this;
    opts = opts || {};
    bs.debug("Setting multiple Options");
    bs.options = bs.options.withMutations(fn);
    if (!opts.silent) {
      bs.events.emit("options:set", {options: bs.options.toJS()});
    }
    return this.options;
  };
  BrowserSync.prototype.removeRewriteRule = function(id) {
    var bs = this;
    bs.setRewriteRules(bs.rewriteRules.filter(fn));
    function fn(item) {
      if (item.id) {
        return item.id !== id;
      }
      return true;
    }
  };
  BrowserSync.prototype.addRewriteRule = function(rule) {
    var bs = this;
    bs.setRewriteRules(bs.rewriteRules.concat(rule));
  };
  BrowserSync.prototype.setRewriteRules = function(rules) {
    var bs = this;
    bs.rewriteRules = rules;
    bs.snippetMw.opts.rules = rules;
  };
  BrowserSync.prototype.doBrowserReload = function() {
    var bs = this;
    if (bs._browserReload) {
      return;
    }
    bs._browserReload = setTimeout(function() {
      bs.io.sockets.emit("browser:reload");
      clearTimeout(bs._browserReload);
      bs._browserReload = false;
    }, bs.options.get("reloadDelay"));
  };
  BrowserSync.prototype.doFileReload = function(data) {
    var bs = this;
    var willReload = utils.willCauseReload([data.path], bs.options.get("injectFileTypes").toJS());
    if (willReload) {
      bs.io.sockets.emit("browser:reload");
      return;
    }
    bs.io.sockets.emit("file:reload", data);
  };
  BrowserSync.prototype.registerCleanupTask = function(fn) {
    this._cleanupTasks.push(fn);
  };
  BrowserSync.prototype.cleanup = function(cb) {
    var bs = this;
    if (!bs.active) {
      return;
    }
    if (bs.events) {
      bs.debug("Removing event listeners...");
      bs.events.removeAllListeners();
    }
    if (bs.watchers) {
      Object.keys(bs.watchers).forEach(function(key) {
        bs.watchers[key].watchers.forEach(function(watcher) {
          watcher.close();
        });
      });
    }
    bs._cleanupTasks.forEach(function(fn) {
      if (_.isFunction(fn)) {
        fn(bs);
      }
    });
    bs.debug("Setting {magenta:active: false");
    bs.active = false;
    bs.paused = false;
    bs.pluginManager.plugins = {};
    bs.pluginManager.pluginOptions = {};
    bs.pluginManager.defaultPlugins = defaultPlugins;
    bs._userPlugins = [];
    bs.userPlugins = [];
    bs._reloadTimer = undefined;
    bs._reloadQueue = [];
    bs._cleanupTasks = [];
    if (_.isFunction(cb)) {
      cb(null, bs);
    }
  };
  module.exports = BrowserSync;
})(require('process'));
