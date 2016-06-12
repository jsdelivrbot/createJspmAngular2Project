/* */ 
(function(process) {
  var injectedScriptConstructor = (function(InjectedScriptHost, inspectedWindow, injectedScriptId) {
    function bind(thisObject, memberFunction) {
      var func = memberFunction;
      var args = Array.prototype.slice.call(arguments, 2);
      function bound() {
        return func.apply(thisObject, args.concat(Array.prototype.slice.call(arguments, 0)));
      }
      bound.toString = function() {
        return "bound: " + func;
      };
      return bound;
    }
    var InjectedScript = function() {
      this._lastBoundObjectId = 1;
      this._idToWrappedObject = {};
      this._objectGroups = {};
    };
    InjectedScript.prototype = {
      wrapObjectForConsole: function(object, canAccessInspectedWindow) {
        if (canAccessInspectedWindow)
          return this._wrapObject(object, "console");
        var result = {};
        result.type = typeof object;
        result.description = this._toString(object);
        return result;
      },
      _wrapObject: function(object, objectGroupName, abbreviate) {
        try {
          var objectId;
          if (typeof object === "object" || typeof object === "function" || this._isHTMLAllCollection(object)) {
            var id = this._lastBoundObjectId++;
            this._idToWrappedObject[id] = object;
            var group = this._objectGroups[objectGroupName];
            if (!group) {
              group = [];
              this._objectGroups[objectGroupName] = group;
            }
            group.push(id);
            objectId = {
              injectedScriptId: injectedScriptId,
              id: id,
              groupName: objectGroupName
            };
          }
          return InjectedScript.RemoteObject.fromObject(object, objectId, abbreviate);
        } catch (e) {
          return InjectedScript.RemoteObject.fromObject("[ Exception: " + e.toString() + " ]");
        }
      },
      _parseObjectId: function(objectId) {
        return eval("(" + objectId + ")");
      },
      releaseWrapperObjectGroup: function(objectGroupName) {
        var group = this._objectGroups[objectGroupName];
        if (!group)
          return;
        for (var i = 0; i < group.length; i++)
          delete this._idToWrappedObject[group[i]];
        delete this._objectGroups[objectGroupName];
      },
      dispatch: function(methodName, args) {
        var argsArray = eval("(" + args + ")");
        var result = this[methodName].apply(this, argsArray);
        if (typeof result === "undefined") {
          inspectedWindow.console.error("Web Inspector error: InjectedScript.%s returns undefined", methodName);
          result = null;
        }
        return result;
      },
      getProperties: function(objectId, ignoreHasOwnProperty, abbreviate) {
        var parsedObjectId = this._parseObjectId(objectId);
        var object = this._objectForId(parsedObjectId);
        if (!this._isDefined(object))
          return false;
        var properties = [];
        var propertyNames;
        if (window.navigator.userAgent.indexOf("MSIE") != -1) {
          propertyNames = this._getPropertyNames(object);
        } else
          propertyNames = ignoreHasOwnProperty ? this._getPropertyNames(object) : Object.getOwnPropertyNames(object);
        if (!ignoreHasOwnProperty && object.__proto__)
          propertyNames.push("__proto__");
        for (var i = 0; i < propertyNames.length; ++i) {
          var propertyName = propertyNames[i];
          var property = {};
          property.name = propertyName + "";
          var isGetter = object["__lookupGetter__"] && object.__lookupGetter__(propertyName);
          if (!isGetter) {
            try {
              property.value = this._wrapObject(object[propertyName], parsedObjectId.groupName, abbreviate);
            } catch (e) {
              property.value = new InjectedScript.RemoteObject.fromException(e);
            }
          } else {
            property.value = new InjectedScript.RemoteObject.fromObject("\u2014");
            property.isGetter = true;
          }
          properties.push(property);
        }
        return properties;
      },
      setPropertyValue: function(objectId, propertyName, expression) {
        var parsedObjectId = this._parseObjectId(objectId);
        var object = this._objectForId(parsedObjectId);
        if (!this._isDefined(object))
          return false;
        var expressionLength = expression.length;
        if (!expressionLength) {
          delete object[propertyName];
          return !(propertyName in object);
        }
        try {
          var result = inspectedWindow.eval("(" + expression + ")");
          object[propertyName] = result;
          return true;
        } catch (e) {
          try {
            var result = inspectedWindow.eval("\"" + expression.replace(/"/g, "\\\"") + "\"");
            object[propertyName] = result;
            return true;
          } catch (e) {
            return false;
          }
        }
      },
      _populatePropertyNames: function(object, resultSet) {
        for (var o = object; o; o = Object.getPrototypeOf(o)) {
          try {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; ++i)
              resultSet[names[i]] = true;
          } catch (e) {}
        }
      },
      _getPropertyNames: function(object, resultSet) {
        var propertyNameSet = {};
        this._populatePropertyNames(object, propertyNameSet);
        return Object.keys(propertyNameSet);
      },
      getCompletions: function(expression, includeCommandLineAPI) {
        var props = {};
        try {
          if (!expression)
            expression = "this";
          var expressionResult = this._evaluateOn(inspectedWindow.eval, inspectedWindow, expression, false, false);
          if (typeof expressionResult === "object")
            this._populatePropertyNames(expressionResult, props);
          if (includeCommandLineAPI) {
            for (var prop in CommandLineAPI.members_)
              props[CommandLineAPI.members_[prop]] = true;
          }
        } catch (e) {}
        return props;
      },
      getCompletionsOnCallFrame: function(callFrameId, expression, includeCommandLineAPI) {
        var props = {};
        try {
          var callFrame = this._callFrameForId(callFrameId);
          if (!callFrame)
            return props;
          if (expression) {
            var expressionResult = this._evaluateOn(callFrame.evaluate, callFrame, expression, true, false);
            if (typeof expressionResult === "object")
              this._populatePropertyNames(expressionResult, props);
          } else {
            var scopeChain = callFrame.scopeChain;
            for (var i = 0; i < scopeChain.length; ++i)
              this._populatePropertyNames(scopeChain[i], props);
          }
          if (includeCommandLineAPI) {
            for (var prop in CommandLineAPI.members_)
              props[CommandLineAPI.members_[prop]] = true;
          }
        } catch (e) {}
        return props;
      },
      evaluate: function(expression, objectGroup, injectCommandLineAPI) {
        return this._evaluateAndWrap(inspectedWindow.eval, inspectedWindow, expression, objectGroup, false, injectCommandLineAPI);
      },
      _evaluateAndWrap: function(evalFunction, object, expression, objectGroup, isEvalOnCallFrame, injectCommandLineAPI) {
        try {
          return this._wrapObject(this._evaluateOn(evalFunction, object, expression, isEvalOnCallFrame, injectCommandLineAPI), objectGroup);
        } catch (e) {
          return InjectedScript.RemoteObject.fromException(e);
        }
      },
      _evaluateOn: function(evalFunction, object, expression, isEvalOnCallFrame, injectCommandLineAPI) {
        try {
          if (injectCommandLineAPI && inspectedWindow.console) {
            inspectedWindow.console._commandLineAPI = new CommandLineAPI(this._commandLineAPIImpl, isEvalOnCallFrame ? object : null);
            expression = "with ((window && window.console && window.console._commandLineAPI) || {}) {\n" + expression + "\n}";
          }
          var value = evalFunction.call(object, expression);
          if (this._type(value) === "error")
            throw value.toString();
          return value;
        } finally {
          if (injectCommandLineAPI && inspectedWindow.console)
            delete inspectedWindow.console._commandLineAPI;
        }
      },
      getNodeId: function(node) {
        return InjectedScriptHost.pushNodePathToFrontend(node, false, false);
      },
      callFrames: function() {
        var callFrame = InjectedScriptHost.currentCallFrame();
        if (!callFrame)
          return false;
        injectedScript.releaseWrapperObjectGroup("backtrace");
        var result = [];
        var depth = 0;
        do {
          result.push(new InjectedScript.CallFrameProxy(depth++, callFrame));
          callFrame = callFrame.caller;
        } while (callFrame);
        return result;
      },
      evaluateOnCallFrame: function(callFrameId, expression, objectGroup, injectCommandLineAPI) {
        var callFrame = this._callFrameForId(callFrameId);
        if (!callFrame)
          return false;
        return this._evaluateAndWrap(callFrame.evaluate, callFrame, expression, objectGroup, true, injectCommandLineAPI);
      },
      _callFrameForId: function(callFrameId) {
        var parsedCallFrameId = eval("(" + callFrameId + ")");
        var ordinal = parsedCallFrameId.ordinal;
        var callFrame = InjectedScriptHost.currentCallFrame();
        while (--ordinal >= 0 && callFrame)
          callFrame = callFrame.caller;
        return callFrame;
      },
      _nodeForId: function(nodeId) {
        if (!nodeId)
          return null;
        return InjectedScriptHost.nodeForId(nodeId);
      },
      _objectForId: function(objectId) {
        return this._idToWrappedObject[objectId.id];
      },
      resolveNode: function(nodeId) {
        var node = this._nodeForId(nodeId);
        if (!node)
          return false;
        return this._wrapObject(node, "prototype");
      },
      getNodeProperties: function(nodeId, properties) {
        var node = this._nodeForId(nodeId);
        if (!node)
          return false;
        properties = eval("(" + properties + ")");
        var result = {};
        for (var i = 0; i < properties.length; ++i)
          result[properties[i]] = node[properties[i]];
        return result;
      },
      getNodePrototypes: function(nodeId) {
        this.releaseWrapperObjectGroup("prototypes");
        var node = this._nodeForId(nodeId);
        if (!node)
          return false;
        var result = [];
        var prototype = node;
        do {
          result.push(this._wrapObject(prototype, "prototypes"));
          prototype = Object.getPrototypeOf(prototype);
        } while (prototype);
        return result;
      },
      pushNodeToFrontend: function(objectId) {
        var parsedObjectId = this._parseObjectId(objectId);
        var object = this._objectForId(parsedObjectId);
        if (!object || this._type(object) !== "node")
          return false;
        return InjectedScriptHost.pushNodePathToFrontend(object, false, false);
      },
      evaluateOnSelf: function(funcBody, args) {
        var func = eval("(" + funcBody + ")");
        return func.apply(this, eval("(" + args + ")") || []);
      },
      _isDefined: function(object) {
        return object || this._isHTMLAllCollection(object);
      },
      _isHTMLAllCollection: function(object) {
        return (typeof object === "undefined") && inspectedWindow.HTMLAllCollection && object instanceof inspectedWindow.HTMLAllCollection;
      },
      _type: function(obj) {
        if (obj === null)
          return "null";
        var type = typeof obj;
        if (type !== "object" && type !== "function") {
          if (this._isHTMLAllCollection(obj))
            return "array";
          return type;
        }
        if (!inspectedWindow.document)
          return type;
        if (obj instanceof inspectedWindow.Node) {
          try {
            return (obj.nodeType === undefined ? type : "node");
          } catch (ex) {}
          return obj.toString();
        }
        if (obj instanceof inspectedWindow.String)
          return "string";
        if (obj instanceof inspectedWindow.Array)
          return "array";
        if (obj instanceof inspectedWindow.Boolean)
          return "boolean";
        if (obj instanceof inspectedWindow.Number)
          return "number";
        if (obj instanceof inspectedWindow.Date)
          return "date";
        if (obj instanceof inspectedWindow.RegExp)
          return "regexp";
        if (isFinite(obj.length) && typeof obj.splice === "function")
          return "array";
        if (isFinite(obj.length) && typeof obj.callee === "function")
          return "array";
        if (obj instanceof inspectedWindow.NodeList)
          return "array";
        if (obj instanceof inspectedWindow.HTMLCollection)
          return "array";
        if (obj instanceof inspectedWindow.Error)
          return "error";
        return type;
      },
      _describe: function(obj, abbreviated) {
        var type = this._type(obj);
        switch (type) {
          case "object":
          case "node":
            var result = InjectedScriptHost.internalConstructorName(obj);
            if (result === "Object") {
              var constructorName = obj.constructor && obj.constructor.name;
              if (constructorName)
                return constructorName;
            }
            return result;
          case "array":
            var className = InjectedScriptHost.internalConstructorName(obj);
            if (typeof obj.length === "number")
              className += "[" + obj.length + "]";
            return className;
          case "string":
            if (!abbreviated)
              return obj;
            if (obj.length > 100)
              return "\"" + obj.substring(0, 100) + "\u2026\"";
            return "\"" + obj + "\"";
          case "function":
            var objectText = this._toString(obj);
            if (abbreviated)
              objectText = /.*/.exec(objectText)[0].replace(/ +$/g, "");
            return objectText;
          default:
            return this._toString(obj);
        }
      },
      _toString: function(obj) {
        return "" + obj;
      }
    };
    var injectedScript = new InjectedScript();
    InjectedScript.RemoteObject = function(objectId, type, description, hasChildren) {
      this.objectId = objectId;
      this.type = type;
      this.description = description;
      this.hasChildren = hasChildren;
    };
    InjectedScript.RemoteObject.fromException = function(e) {
      return new InjectedScript.RemoteObject(null, "error", e.toString());
    };
    InjectedScript.RemoteObject.fromObject = function(object, objectId, abbreviate) {
      var type = injectedScript._type(object);
      var rawType = typeof object;
      var hasChildren = (rawType === "object" && object !== null && (Object.getOwnPropertyNames(object).length || !!Object.getPrototypeOf(object))) || rawType === "function";
      var description = "";
      try {
        var description = injectedScript._describe(object, abbreviate);
        return new InjectedScript.RemoteObject(objectId, type, description, hasChildren);
      } catch (e) {
        return InjectedScript.RemoteObject.fromException(e);
      }
    };
    InjectedScript.CallFrameProxy = function(ordinal, callFrame) {
      this.id = {
        ordinal: ordinal,
        injectedScriptId: injectedScriptId
      };
      this.type = callFrame.type;
      this.functionName = (this.type === "function" ? callFrame.functionName : "");
      this.sourceID = callFrame.sourceID;
      this.line = callFrame.line;
      this.column = callFrame.column;
      this.scopeChain = this._wrapScopeChain(callFrame);
    };
    InjectedScript.CallFrameProxy.prototype = {_wrapScopeChain: function(callFrame) {
        var GLOBAL_SCOPE = 0;
        var LOCAL_SCOPE = 1;
        var WITH_SCOPE = 2;
        var CLOSURE_SCOPE = 3;
        var CATCH_SCOPE = 4;
        var scopeChain = callFrame.scopeChain;
        var scopeChainProxy = [];
        var foundLocalScope = false;
        for (var i = 0; i < scopeChain.length; i++) {
          var scopeType = callFrame.scopeType(i);
          var scopeObject = scopeChain[i];
          var scopeObjectProxy = injectedScript._wrapObject(scopeObject, "backtrace", true);
          switch (scopeType) {
            case LOCAL_SCOPE:
              {
                foundLocalScope = true;
                scopeObjectProxy.isLocal = true;
                scopeObjectProxy.thisObject = injectedScript._wrapObject(callFrame.thisObject, "backtrace", true);
                break;
              }
            case CLOSURE_SCOPE:
              {
                scopeObjectProxy.isClosure = true;
                break;
              }
            case WITH_SCOPE:
            case CATCH_SCOPE:
              {
                if (foundLocalScope && scopeObject instanceof inspectedWindow.Element)
                  scopeObjectProxy.isElement = true;
                else if (foundLocalScope && scopeObject instanceof inspectedWindow.Document)
                  scopeObjectProxy.isDocument = true;
                else
                  scopeObjectProxy.isWithBlock = true;
                break;
              }
          }
          scopeChainProxy.push(scopeObjectProxy);
        }
        return scopeChainProxy;
      }};
    function CommandLineAPI(commandLineAPIImpl, callFrame) {
      function inScopeVariables(member) {
        if (!callFrame)
          return false;
        var scopeChain = callFrame.scopeChain;
        for (var i = 0; i < scopeChain.length; ++i) {
          if (member in scopeChain[i])
            return true;
        }
        return false;
      }
      for (var i = 0; i < CommandLineAPI.members_.length; ++i) {
        var member = CommandLineAPI.members_[i];
        if (member in inspectedWindow || inScopeVariables(member))
          continue;
        this[member] = bind(commandLineAPIImpl, commandLineAPIImpl[member]);
      }
      for (var i = 0; i < 5; ++i) {
        var member = "$" + i;
        if (member in inspectedWindow || inScopeVariables(member))
          continue;
        Object.defineProperty(this, "$" + i, {get: bind(commandLineAPIImpl, commandLineAPIImpl._inspectedNode, i)});
      }
    }
    CommandLineAPI.members_ = ["$", "$$", "$x", "dir", "dirxml", "keys", "values", "profile", "profileEnd", "monitorEvents", "unmonitorEvents", "inspect", "copy", "clear"];
    function CommandLineAPIImpl() {}
    CommandLineAPIImpl.prototype = {
      $: function() {
        return document.getElementById.apply(document, arguments);
      },
      $$: function() {
        return document.querySelectorAll.apply(document, arguments);
      },
      $x: function(xpath, context) {
        var nodes = [];
        try {
          var doc = (context && context.ownerDocument) || inspectedWindow.document;
          var results = doc.evaluate(xpath, context || doc, null, XPathResult.ANY_TYPE, null);
          var node;
          while (node = results.iterateNext())
            nodes.push(node);
        } catch (e) {}
        return nodes;
      },
      dir: function() {
        return console.dir.apply(console, arguments);
      },
      dirxml: function() {
        return console.dirxml.apply(console, arguments);
      },
      keys: function(object) {
        return Object.keys(object);
      },
      values: function(object) {
        var result = [];
        for (var key in object)
          result.push(object[key]);
        return result;
      },
      profile: function() {
        return console.profile.apply(console, arguments);
      },
      profileEnd: function() {
        return console.profileEnd.apply(console, arguments);
      },
      monitorEvents: function(object, types) {
        if (!object || !object.addEventListener || !object.removeEventListener)
          return;
        types = this._normalizeEventTypes(types);
        for (var i = 0; i < types.length; ++i) {
          object.removeEventListener(types[i], this._logEvent, false);
          object.addEventListener(types[i], this._logEvent, false);
        }
      },
      unmonitorEvents: function(object, types) {
        if (!object || !object.addEventListener || !object.removeEventListener)
          return;
        types = this._normalizeEventTypes(types);
        for (var i = 0; i < types.length; ++i)
          object.removeEventListener(types[i], this._logEvent, false);
      },
      inspect: function(object) {
        if (arguments.length === 0)
          return;
        inspectedWindow.console.log(object);
        if (injectedScript._type(object) === "node")
          InjectedScriptHost.pushNodePathToFrontend(object, false, true);
        else {
          switch (injectedScript._describe(object)) {
            case "Database":
              InjectedScriptHost.selectDatabase(object);
              break;
            case "Storage":
              InjectedScriptHost.selectDOMStorage(object);
              break;
          }
        }
      },
      copy: function(object) {
        if (injectedScript._type(object) === "node")
          object = object.outerHTML;
        InjectedScriptHost.copyText(object);
      },
      clear: function() {
        InjectedScriptHost.clearConsoleMessages();
      },
      _inspectedNode: function(num) {
        var nodeId = InjectedScriptHost.inspectedNode(num);
        return injectedScript._nodeForId(nodeId);
      },
      _normalizeEventTypes: function(types) {
        if (typeof types === "undefined")
          types = ["mouse", "key", "load", "unload", "abort", "error", "select", "change", "submit", "reset", "focus", "blur", "resize", "scroll"];
        else if (typeof types === "string")
          types = [types];
        var result = [];
        for (var i = 0; i < types.length; i++) {
          if (types[i] === "mouse")
            result.splice(0, 0, "mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout");
          else if (types[i] === "key")
            result.splice(0, 0, "keydown", "keyup", "keypress");
          else
            result.push(types[i]);
        }
        return result;
      },
      _logEvent: function(event) {
        console.log(event.type, event);
      }
    };
    injectedScript._commandLineAPIImpl = new CommandLineAPIImpl();
    return injectedScript;
  });
})(require('process'));
