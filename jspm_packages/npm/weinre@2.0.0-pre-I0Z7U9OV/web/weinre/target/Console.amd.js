/* */ 
;modjewel.define("weinre/target/Console", function(require, exports, module) { // Generated by CoffeeScript 1.8.0
var Console, MessageLevel, MessageSource, MessageType, OriginalConsole, RemoteConsole, Timeline, UsingRemote, Weinre;

Weinre = require('../common/Weinre');

Timeline = require('../target/Timeline');

UsingRemote = false;

RemoteConsole = null;

OriginalConsole = null;

MessageSource = {
  HTML: 0,
  WML: 1,
  XML: 2,
  JS: 3,
  CSS: 4,
  Other: 5
};

MessageType = {
  Log: 0,
  Object: 1,
  Trace: 2,
  StartGroup: 3,
  StartGroupCollapsed: 4,
  EndGroup: 5,
  Assert: 6,
  UncaughtException: 7,
  Result: 8
};

MessageLevel = {
  Tip: 0,
  Log: 1,
  Warning: 2,
  Error: 3,
  Debug: 4
};

module.exports = Console = (function() {
  function Console() {}

  Object.defineProperty(Console, 'original', {
    get: function() {
      return OriginalConsole;
    }
  });

  Console.useRemote = function(value) {
    var oldValue;
    if (arguments.length === 0) {
      return UsingRemote;
    }
    oldValue = UsingRemote;
    UsingRemote = !!value;
    if (UsingRemote) {
      window.console = RemoteConsole;
    } else {
      window.console = OriginalConsole;
    }
    return oldValue;
  };

  Console.prototype._generic = function(level, messageParts) {
    var message, messagePart, parameters, payload, _i, _len;
    message = messageParts[0].toString();
    parameters = [];
    for (_i = 0, _len = messageParts.length; _i < _len; _i++) {
      messagePart = messageParts[_i];
      parameters.push(Weinre.injectedScript.wrapObjectForConsole(messagePart, true));
    }
    payload = {
      source: MessageSource.JS,
      type: MessageType.Log,
      level: level,
      message: message,
      parameters: parameters
    };
    return Weinre.wi.ConsoleNotify.addConsoleMessage(payload);
  };

  Console.prototype.log = function() {
    return this._generic(MessageLevel.Log, [].slice.call(arguments));
  };

  Console.prototype.debug = function() {
    return this._generic(MessageLevel.Debug, [].slice.call(arguments));
  };

  Console.prototype.error = function() {
    return this._generic(MessageLevel.Error, [].slice.call(arguments));
  };

  Console.prototype.info = function() {
    return this._generic(MessageLevel.Log, [].slice.call(arguments));
  };

  Console.prototype.warn = function() {
    return this._generic(MessageLevel.Warning, [].slice.call(arguments));
  };

  Console.prototype.dir = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.dirxml = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.trace = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.assert = function(condition) {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.count = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.markTimeline = function(message) {
    return Timeline.addRecord_Mark(message);
  };

  Console.prototype.lastWMLErrorMessage = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.profile = function(title) {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.profileEnd = function(title) {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.time = function(title) {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.timeEnd = function(title) {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.group = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.groupCollapsed = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  Console.prototype.groupEnd = function() {
    return Weinre.notImplemented(arguments.callee.signature);
  };

  return Console;

})();

RemoteConsole = new Console();

OriginalConsole = window.console || {};

RemoteConsole.__original = OriginalConsole;

OriginalConsole.__original = OriginalConsole;

require("../common/MethodNamer").setNamesForClass(module.exports);

});
