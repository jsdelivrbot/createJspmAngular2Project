/* */ 
var WeinreClientEvents,
    WeinreTargetCommands,
    WeinreTargetEvents,
    channelManager,
    getCallbackChannel,
    serviceManager,
    utils;
utils = require('../utils');
channelManager = require('../channelManager');
serviceManager = require('../serviceManager');
WeinreClientEvents = serviceManager.get('WeinreClientEvents');
WeinreTargetEvents = serviceManager.get('WeinreTargetEvents');
module.exports = utils.registerClass(WeinreTargetCommands = (function() {
  function WeinreTargetCommands() {}
  WeinreTargetCommands.prototype.registerTarget = function(channel, url, callbackId) {
    var clients;
    channel.description.url = url;
    clients = channelManager.getClientChannels(channel.id);
    WeinreClientEvents.targetRegistered(clients, channel.description);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, channel.description);
    }
  };
  WeinreTargetCommands.prototype.sendClientCallback = function(channel, clientCallbackId, args, callbackId) {
    var callbackChannel;
    callbackChannel = getCallbackChannel(clientCallbackId);
    if (!callbackChannel) {
      return main.warn("" + this.constructor.name + ".sendClientCallback() sent with invalid callbackId: " + clientCallbackId);
    }
    callbackChannel = channelManager.getChannel(callbackChannel);
    if (!callbackChannel) {
      return main.warn("" + this.constructor.name + ".sendClientCallback() unable to find channel : " + clientCallbackId);
    }
    WeinreClientEvents.sendCallback(callbackChannel, clientCallbackId, args);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, description);
    }
  };
  WeinreTargetCommands.prototype.logDebug = function(channel, message, callbackId) {
    utils.logVerbose("target " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, description);
    }
  };
  WeinreTargetCommands.prototype.logInfo = function(channel, message, callbackId) {
    utils.log("target " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, description);
    }
  };
  WeinreTargetCommands.prototype.logWarning = function(channel, message, callbackId) {
    utils.log("target " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, description);
    }
  };
  WeinreTargetCommands.prototype.logError = function(channel, message, callbackId) {
    utils.log("target " + channel.name + ": " + message);
    if (callbackId) {
      return WeinreTargetEvents.sendCallback(channel, callbackId, description);
    }
  };
  return WeinreTargetCommands;
})());
getCallbackChannel = function(callbackId) {
  callbackId = callbackId.toString();
  return callbackId.split('::')[0];
};
