/* */ 
var tfunk = require('tfunk');
var _ = require('./lodash.custom');
var defaults = {
  level: "info",
  prefix: "",
  levels: {
    "trace": 100,
    "debug": 200,
    "warn": 300,
    "info": 400,
    "error": 500
  },
  prefixes: {
    "trace": "[trace] ",
    "debug": "{yellow:[debug]} ",
    "info": "{cyan:[info]} ",
    "warn": "{magenta:[warn]} ",
    "error": "{red:[error]} "
  },
  useLevelPrefixes: false
};
var Logger = function(config) {
  if (!(this instanceof Logger)) {
    return new Logger(config);
  }
  config = config || {};
  this._mute = false;
  this.config = _.merge({}, defaults, config);
  this.addLevelMethods(this.config.levels);
  this.compiler = new tfunk.Compiler(this.config.custom || {}, this.config);
  this._memo = {};
  return this;
};
Logger.prototype.setOnce = function(path, value) {
  if (typeof this.config[path] !== "undefined") {
    if (typeof this._memo[path] === "undefined") {
      this._memo[path] = this.config[path];
    }
    this.config[path] = value;
  }
  return this;
};
Logger.prototype.addLevelMethods = function(items) {
  Object.keys(items).forEach(function(item) {
    if (!this[item]) {
      this[item] = function() {
        var args = Array.prototype.slice.call(arguments);
        this.log.apply(this, args);
        return this;
      }.bind(this, item);
    }
  }, this);
};
Logger.prototype.reset = function() {
  this.setLevel(defaults.level).setLevelPrefixes(defaults.useLevelPrefixes).mute(false);
  return this;
};
Logger.prototype.canLog = function(level) {
  return this.config.levels[level] >= this.config.levels[this.config.level] && !this._mute;
};
Logger.prototype.log = function(level, msg) {
  var args = Array.prototype.slice.call(arguments);
  this.logOne(args, msg, level);
  return this;
};
Logger.prototype.setLevel = function(level) {
  this.config.level = level;
  return this;
};
Logger.prototype.setLevelPrefixes = function(state) {
  this.config.useLevelPrefixes = state;
  return this;
};
Logger.prototype.setPrefix = function(prefix) {
  if (typeof prefix === "string") {
    this.compiler.prefix = this.compiler.compile(prefix, true);
  }
  if (typeof prefix === "function") {
    this.compiler.prefix = prefix;
  }
};
Logger.prototype.unprefixed = function(level, msg) {
  var args = Array.prototype.slice.call(arguments);
  this.logOne(args, msg, level, true);
  return this;
};
Logger.prototype.logOne = function(args, msg, level, unprefixed) {
  if (!this.canLog(level)) {
    return;
  }
  args = args.slice(2);
  if (this.config.useLevelPrefixes && !unprefixed) {
    msg = this.config.prefixes[level] + msg;
  }
  msg = this.compiler.compile(msg, unprefixed);
  args.unshift(msg);
  console.log.apply(console, args);
  this.resetTemps();
  return this;
};
Logger.prototype.resetTemps = function() {
  Object.keys(this._memo).forEach(function(key) {
    this.config[key] = this._memo[key];
  }, this);
};
Logger.prototype.mute = function(bool) {
  this._mute = bool;
  return this;
};
Logger.prototype.clone = function(opts) {
  var config = _.cloneDeep(this.config);
  if (typeof opts === "function") {
    config = opts(config) || {};
  } else {
    config = _.merge({}, config, opts || {});
  }
  return new Logger(config);
};
module.exports.Logger = Logger;
module.exports.compile = tfunk;
