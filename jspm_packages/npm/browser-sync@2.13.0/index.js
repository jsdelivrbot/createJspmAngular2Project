/* */ 
(function(process) {
  "use strict";
  var pjson = require('./package.json!systemjs-json');
  var BrowserSync = require('./lib/browser-sync');
  var publicUtils = require('./lib/public/public-utils');
  var events = require('events');
  var PassThrough = require('stream').PassThrough;
  var logger = require('eazy-logger').Logger({useLevelPrefixes: true});
  var singleton = false;
  var singletonPlugins = [];
  var instances = [];
  var singletonEmitter = false;
  module.exports = initSingleton;
  module.exports.create = create;
  module.exports.get = function(name) {
    var instance = getSingle(name);
    if (instance) {
      return instance;
    }
    throw new Error("An instance with the name `%s` was not found.".replace("%s", name));
  };
  module.exports.has = function(name) {
    var instance = getSingle(name);
    if (instance) {
      return true;
    }
    return false;
  };
  module.exports.init = initSingleton;
  module.exports.use = function() {
    var args = Array.prototype.slice.call(arguments);
    singletonPlugins.push({args: args});
  };
  module.exports.reload = noop("reload");
  module.exports.stream = noop("stream");
  module.exports.notify = noop("notify");
  module.exports.exit = noop("exit");
  module.exports.watch = noop("watch");
  module.exports.pause = noop("pause");
  module.exports.resume = noop("resume");
  Object.defineProperties(module.exports, {
    "emitter": {get: function() {
        if (!singletonEmitter) {
          singletonEmitter = newEmitter();
          return singletonEmitter;
        }
        return singletonEmitter;
      }},
    "active": {get: getSingletonValue.bind(null, "active")},
    "paused": {get: getSingletonValue.bind(null, "paused")}
  });
  function newEmitter() {
    var emitter = new events.EventEmitter();
    emitter.setMaxListeners(20);
    return emitter;
  }
  function getSingletonEmitter() {
    if (singletonEmitter) {
      return singletonEmitter;
    }
    singletonEmitter = newEmitter();
    return singletonEmitter;
  }
  function noop(name) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      if (singleton) {
        return singleton[name].apply(singleton, args);
      } else {
        if (publicUtils.isStreamArg(name, args)) {
          return new PassThrough({objectMode: true});
        }
      }
    };
  }
  function initSingleton() {
    var instance;
    if (instances.length) {
      instance = instances.filter(function(item) {
        return item.name === "singleton";
      });
      if (instance.length) {
        logger.error("{yellow:You tried to start Browsersync twice!} To create multiple instances, use {cyan:browserSync.create().init()");
        return instance;
      }
    }
    var args = Array.prototype.slice.call(arguments);
    singleton = create("singleton", getSingletonEmitter());
    if (singletonPlugins.length) {
      singletonPlugins.forEach(function(obj) {
        singleton.instance.registerPlugin.apply(singleton.instance, obj.args);
      });
    }
    singleton.init.apply(null, args);
    return singleton;
  }
  function getSingletonValue(prop) {
    var single = getSingle("singleton");
    if (single) {
      return single[prop];
    }
    return false;
  }
  function getSingle(name) {
    if (instances.length) {
      var match = instances.filter(function(item) {
        return item.name === name;
      });
      if (match.length) {
        return match[0];
      }
    }
    return false;
  }
  function create(name, emitter) {
    name = name || new Date().getTime();
    emitter = emitter || newEmitter();
    var browserSync = new BrowserSync(emitter);
    var instance = {
      name: name,
      instance: browserSync,
      exit: require('./lib/public/exit')(browserSync),
      notify: require('./lib/public/notify')(browserSync),
      pause: require('./lib/public/pause')(browserSync),
      resume: require('./lib/public/resume')(browserSync),
      reload: require('./lib/public/reload')(emitter),
      stream: require('./lib/public/stream')(emitter),
      cleanup: browserSync.cleanup.bind(browserSync),
      use: browserSync.registerPlugin.bind(browserSync),
      getOption: browserSync.getOption.bind(browserSync),
      emitter: browserSync.events,
      watch: require('./lib/file-watcher').watch
    };
    browserSync.publicInstance = instance;
    instance.init = require('./lib/public/init')(browserSync, name, pjson);
    Object.defineProperty(instance, "active", {get: function() {
        return browserSync.active;
      }});
    Object.defineProperty(instance, "paused", {get: function() {
        return browserSync.paused;
      }});
    Object.defineProperty(instance, "sockets", {get: function() {
        if (!browserSync.active) {
          return {
            emit: function() {},
            on: function() {}
          };
        } else {
          return browserSync.io.sockets;
        }
      }});
    instances.push(instance);
    return instance;
  }
  module.exports.reset = function() {
    instances.forEach(function(item) {
      item.cleanup();
    });
    instances = [];
    singletonPlugins = [];
    singletonEmitter = false;
    singleton = false;
  };
  module.exports.instances = instances;
})(require('process'));
