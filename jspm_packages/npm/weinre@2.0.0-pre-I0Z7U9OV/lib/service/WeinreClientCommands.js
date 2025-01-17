/* */ 
var WeinreClientCommands,
    WeinreClientEvents,
    channelManager,
    extensionManager,
    serviceManager,
    utils,
    weinre,
    _,
    __hasProp = {}.hasOwnProperty;
_ = require('underscore');
weinre = require('../weinre');
utils = require('../utils');
channelManager = require('../channelManager');
serviceManager = require('../serviceManager');
extensionManager = require('../extensionManager');
WeinreClientEvents = serviceManager.get('WeinreClientEvents');
module.exports = utils.registerClass(WeinreClientCommands = (function() {
  function WeinreClientCommands() {}
  WeinreClientCommands.prototype.registerClient = function(channel, callbackId) {
    var clients,
        key,
        options,
        val,
        _ref;
    if (callbackId) {
      WeinreClientEvents.sendCallback(channel, callbackId, channel.description);
    }
    options = _.extend({}, utils.options);
    for (key in options) {
      if (!__hasProp.call(options, key))
        continue;
      val = options[key];
      if ((_ref = typeof val) === 'number' || _ref === 'boolean') {
        options[key] = "" + val;
      }
    }
    options.version = weinre.getVersion();
    WeinreClientEvents.serverProperties(channel, options);
    clients = channelManager.getClientChannels(channel.id);
    return WeinreClientEvents.clientRegistered(clients, channel.description);
  };
  WeinreClientCommands.prototype.getTargets = function(channel, callbackId) {
    var channels,
        result;
    channels = channelManager.getTargetChannels(channel.id);
    result = _.pluck(channels, 'description');
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId, [result]);
    }
  };
  WeinreClientCommands.prototype.getClients = function(channel, callbackId) {
    var channels,
        result;
    channels = channelManager.getClientChannels(channel.id);
    result = _.pluck(channels, 'description');
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId, [result]);
    }
  };
  WeinreClientCommands.prototype.getExtensions = function(channel, callbackId) {
    var extension,
        result;
    result = (function() {
      var _i,
          _len,
          _ref,
          _results;
      _ref = extensionManager.extensions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        extension = _ref[_i];
        _results.push({startPage: "extensions/" + extension + "/extension.html"});
      }
      return _results;
    })();
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId, [result]);
    }
  };
  WeinreClientCommands.prototype.connectTarget = function(channel, clientName, targetName, callbackId) {
    var client,
        target;
    client = channelManager.getChannel(clientName);
    if (!client) {
      return;
    }
    target = channelManager.getChannel(targetName);
    if (!target) {
      return;
    }
    channelManager.connectChannels(client, target);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  WeinreClientCommands.prototype.disconnectTarget = function(channel, clientName, callbackId) {
    var client,
        target;
    client = connectionManager.getClient(clientName);
    if (!client) {
      return;
    }
    target = client.getConnectedTarget();
    if (!target) {
      return;
    }
    connectionManager.disconnect(client, target);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  WeinreClientCommands.prototype.logDebug = function(channel, message, callbackId) {
    utils.logVerbose("client " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  WeinreClientCommands.prototype.logInfo = function(channel, message, callbackId) {
    utils.log("client " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  WeinreClientCommands.prototype.logWarning = function(channel, message, callbackId) {
    utils.log("client " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  WeinreClientCommands.prototype.logError = function(channel, message, callbackId) {
    utils.log("client " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreClientEvents.sendCallback(channel, callbackId);
    }
  };
  return WeinreClientCommands;
})());
