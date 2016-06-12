/* */ 
"use strict";
var _ = require('../lodash.custom');
var utils = require('./utils');
var Rx = require('rx/dist/rx.all');
module.exports.plugin = function(bs) {
  var options = bs.options;
  var emitter = bs.emitter;
  var subject = new Rx.Subject();
  var sub$ = getObservable(subject, bs.options);
  var subscription = sub$.subscribe(function(value) {
    emitter.emit("file:changed", value);
  });
  bs.registerCleanupTask(function() {
    subscription.dispose();
    subject.dispose();
  });
  var defaultWatchOptions = options.get("watchOptions").toJS();
  return options.get("files").reduce(function(map, glob, namespace) {
    var fn = function(event, path) {
      subject.onNext({
        event: event,
        path: path,
        namespace: namespace
      });
    };
    var jsItem = glob.toJS();
    if (jsItem.globs.length) {
      var watcher = watch(jsItem.globs, defaultWatchOptions, fn);
      map[namespace] = {watchers: [watcher]};
    }
    if (jsItem.objs.length) {
      jsItem.objs.forEach(function(item) {
        if (!_.isFunction(item.fn)) {
          item.fn = fn;
        }
        var watcher = watch(item.match, item.options || defaultWatchOptions, item.fn.bind(bs.publicInstance));
        if (!map[namespace]) {
          map[namespace] = {watchers: [watcher]};
        } else {
          map[namespace].watchers.push(watcher);
        }
      });
    }
    return map;
  }, {});
};
function watch(patterns, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  var watcher = require('chokidar').watch(patterns, opts);
  if (_.isFunction(cb)) {
    watcher.on("all", cb);
  }
  return watcher;
}
module.exports.watch = watch;
function getObservable(subject, options) {
  var globalItems = [{
    option: "reloadDebounce",
    fnName: "debounce"
  }, {
    option: "reloadThrottle",
    fnName: "throttle"
  }, {
    option: "reloadDelay",
    fnName: "delay"
  }];
  var scheduler = options.getIn(["debug", "scheduler"]);
  return globalItems.reduce(function(subject, item) {
    var value = options.get(item.option);
    if (value > 0) {
      return subject[item.fnName].call(subject, value, scheduler);
    }
    return subject;
  }, subject);
}
