/* */ 
;modjewel.define("weinre/target/Target", function(require, exports, module) { // Generated by CoffeeScript 1.8.0
var Binding, CSSStore, Callback, CheckForProblems, ElementHighlighter, Ex, HookLib, InjectedScriptHostImpl, MessageDispatcher, NetworkRequest, NodeStore, Target, Weinre, WeinreExtraClientCommandsImpl, WeinreTargetEventsImpl, WiCSSImpl, WiConsoleImpl, WiDOMImpl, WiDOMStorageImpl, WiDatabaseImpl, WiInspectorImpl, WiRuntimeImpl, currentTime;

require('./BrowserHacks');

Ex = require('../common/Ex');

Binding = require('../common/Binding');

Callback = require('../common/Callback');

MessageDispatcher = require('../common/MessageDispatcher');

Weinre = require('../common/Weinre');

HookLib = require('../common/HookLib');

CheckForProblems = require('./CheckForProblems');

NodeStore = require('./NodeStore');

CSSStore = require('./CSSStore');

ElementHighlighter = require('./ElementHighlighter');

InjectedScriptHostImpl = require('./InjectedScriptHostImpl');

NetworkRequest = require('./NetworkRequest');

WeinreTargetEventsImpl = require('./WeinreTargetEventsImpl');

WeinreExtraClientCommandsImpl = require('./WeinreExtraClientCommandsImpl');

WiConsoleImpl = require('./WiConsoleImpl');

WiCSSImpl = require('./WiCSSImpl');

WiDatabaseImpl = require('./WiDatabaseImpl');

WiDOMImpl = require('./WiDOMImpl');

WiDOMStorageImpl = require('./WiDOMStorageImpl');

WiInspectorImpl = require('./WiInspectorImpl');

WiRuntimeImpl = require('./WiRuntimeImpl');

module.exports = Target = (function() {
  function Target() {}

  Target.main = function() {
    CheckForProblems.check();
    Weinre.target = new Target();
    return Weinre.target.initialize();
  };

  Target.prototype.setWeinreServerURLFromScriptSrc = function(element) {
    var match, message, pattern;
    if (window.WeinreServerURL) {
      return;
    }
    if (element) {
      pattern = /((https?:)?\/\/(.*?)\/)/;
      match = pattern.exec(element.src);
      if (match) {
        window.WeinreServerURL = match[1];
        return;
      }
    }
    message = "unable to calculate the weinre server url; explicity set the variable window.WeinreServerURL instead";
    alert(message);
    throw new Ex(arguments, message);
  };

  Target.prototype.setWeinreServerIdFromScriptSrc = function(element) {
    var attempt, hash;
    if (window.WeinreServerId) {
      return;
    }
    element = this.getTargetScriptElement();
    hash = "anonymous";
    if (element) {
      attempt = element.src.split("#")[1];
      if (attempt) {
        hash = attempt;
      } else {
        attempt = location.hash.split("#")[1];
        if (attempt) {
          hash = attempt;
        }
      }
    }
    return window.WeinreServerId = hash;
  };

  Target.prototype.getTargetScriptElement = function() {
    var element, elements, i, j, scripts;
    elements = document.getElementsByTagName("script");
    scripts = ["target-script.js", "target-script-min.js"];
    i = 0;
    while (i < elements.length) {
      element = elements[i];
      j = 0;
      while (j < scripts.length) {
        if (-1 !== element.src.indexOf("/" + scripts[j])) {
          return element;
        }
        j++;
      }
      i++;
    }
  };

  Target.prototype.initialize = function() {
    var element, injectedScriptHost, messageDispatcher;
    element = this.getTargetScriptElement();
    this.setWeinreServerURLFromScriptSrc(element);
    this.setWeinreServerIdFromScriptSrc(element);
    if (window.WeinreServerURL[window.WeinreServerURL.length - 1] !== "/") {
      window.WeinreServerURL += "/";
    }
    injectedScriptHost = new InjectedScriptHostImpl();
    Weinre.injectedScript = injectedScriptConstructor(injectedScriptHost, window, 0, "?");
    window.addEventListener("load", Binding(this, "onLoaded"), false);
    document.addEventListener("DOMContentLoaded", Binding(this, "onDOMContent"), false);
    this._startTime = currentTime();
    if (document.readyState === "loaded") {
      HookLib.ignoreHooks((function(_this) {
        return function() {
          return setTimeout((function() {
            return _this.onDOMContent();
          }), 10);
        };
      })(this));
    }
    if (document.readyState === "complete") {
      HookLib.ignoreHooks((function(_this) {
        return function() {
          setTimeout((function() {
            return _this.onDOMContent();
          }), 10);
          return setTimeout((function() {
            return _this.onLoaded();
          }), 20);
        };
      })(this));
    }
    messageDispatcher = new MessageDispatcher(window.WeinreServerURL + "ws/target", window.WeinreServerId);
    Weinre.messageDispatcher = messageDispatcher;
    Weinre.wi = {};
    Weinre.wi.Console = new WiConsoleImpl();
    Weinre.wi.CSS = new WiCSSImpl();
    Weinre.wi.Database = new WiDatabaseImpl();
    Weinre.wi.DOM = new WiDOMImpl();
    Weinre.wi.DOMStorage = new WiDOMStorageImpl();
    Weinre.wi.Inspector = new WiInspectorImpl();
    Weinre.wi.Runtime = new WiRuntimeImpl();
    messageDispatcher.registerInterface("Console", Weinre.wi.Console, false);
    messageDispatcher.registerInterface("CSS", Weinre.wi.CSS, false);
    messageDispatcher.registerInterface("Database", Weinre.wi.Database, false);
    messageDispatcher.registerInterface("DOM", Weinre.wi.DOM, false);
    messageDispatcher.registerInterface("DOMStorage", Weinre.wi.DOMStorage, false);
    messageDispatcher.registerInterface("Inspector", Weinre.wi.Inspector, false);
    messageDispatcher.registerInterface("Runtime", Weinre.wi.Runtime, false);
    messageDispatcher.registerInterface("WeinreExtraClientCommands", new WeinreExtraClientCommandsImpl(), true);
    messageDispatcher.registerInterface("WeinreTargetEvents", new WeinreTargetEventsImpl(), true);
    Weinre.wi.ApplicationCacheNotify = messageDispatcher.createProxy("ApplicationCacheNotify");
    Weinre.wi.ConsoleNotify = messageDispatcher.createProxy("ConsoleNotify");
    Weinre.wi.DOMNotify = messageDispatcher.createProxy("DOMNotify");
    Weinre.wi.DOMStorageNotify = messageDispatcher.createProxy("DOMStorageNotify");
    Weinre.wi.DatabaseNotify = messageDispatcher.createProxy("DatabaseNotify");
    Weinre.wi.InspectorNotify = messageDispatcher.createProxy("InspectorNotify");
    Weinre.wi.TimelineNotify = messageDispatcher.createProxy("TimelineNotify");
    Weinre.wi.NetworkNotify = messageDispatcher.createProxy("NetworkNotify");
    Weinre.WeinreTargetCommands = messageDispatcher.createProxy("WeinreTargetCommands");
    Weinre.WeinreExtraTargetEvents = messageDispatcher.createProxy("WeinreExtraTargetEvents");
    messageDispatcher.getWebSocket().addEventListener("open", Binding(this, this.cb_webSocketOpened));
    Weinre.nodeStore = new NodeStore();
    Weinre.cssStore = new CSSStore();
    return NetworkRequest.installNativeHooks();
  };

  Target.prototype.cb_webSocketOpened = function() {
    return Weinre.WeinreTargetCommands.registerTarget(window.location.href, Binding(this, this.cb_registerTarget));
  };

  Target.prototype.cb_registerTarget = function(targetDescription) {
    return Weinre.targetDescription = targetDescription;
  };

  Target.prototype.onLoaded = function() {
    if (!Weinre.wi.InspectorNotify) {
      HookLib.ignoreHooks((function(_this) {
        return function() {
          return setTimeout((function() {
            return _this.onLoaded();
          }), 10);
        };
      })(this));
      return;
    }
    return Weinre.wi.InspectorNotify.loadEventFired(currentTime() - this._startTime);
  };

  Target.prototype.onDOMContent = function() {
    if (!Weinre.wi.InspectorNotify) {
      HookLib.ignoreHooks((function(_this) {
        return function() {
          return setTimeout((function() {
            return _this.onDOMContent();
          }), 10);
        };
      })(this));
      return;
    }
    return Weinre.wi.InspectorNotify.domContentEventFired(currentTime() - this._startTime);
  };

  Target.prototype.setDocument = function() {
    var nodeData, nodeId;
    if (!Weinre.elementHighlighter) {
      Weinre.elementHighlighter = ElementHighlighter.create();
    }
    nodeId = Weinre.nodeStore.getNodeId(document);
    nodeData = Weinre.nodeStore.getNodeData(nodeId, 2);
    return Weinre.wi.DOMNotify.setDocument(nodeData);
  };

  Target.prototype.whenBodyReady = function(receiver, args, func) {
    if (document.body) {
      func.apply(receiver, args);
      return;
    }
    return document.addEventListener("DOMContentLoaded", function() {
      return func.apply(receiver, args);
    }, false);
  };

  return Target;

})();

currentTime = function() {
  return (new Date().getMilliseconds()) / 1000.0;
};

require("../common/MethodNamer").setNamesForClass(module.exports);

});
