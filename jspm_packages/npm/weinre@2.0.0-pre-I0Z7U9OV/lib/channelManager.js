/* */ 
var ChannelManager,
    WeinreClientEvents,
    WeinreTargetEvents,
    channelManager,
    serviceManager,
    utils,
    _;
_ = require('underscore');
utils = require('./utils');
serviceManager = require('./serviceManager');
WeinreClientEvents = null;
WeinreTargetEvents = null;
channelManager = null;
utils.registerClass(ChannelManager = (function() {
  function ChannelManager() {
    this.channels = {};
  }
  ChannelManager.prototype.initialize = function() {
    WeinreClientEvents = serviceManager.get('WeinreClientEvents');
    WeinreTargetEvents = serviceManager.get('WeinreTargetEvents');
    if (!WeinreClientEvents) {
      utils.exit('WeinreClientEvents service not registered');
    }
    if (!WeinreTargetEvents) {
      return utils.exit('WeinreTargetEvents service not registered');
    }
  };
  ChannelManager.prototype.created = function(channel) {
    return this.channels[channel.name] = channel;
  };
  ChannelManager.prototype.destroyed = function(channel) {
    var clients,
        connection,
        _i,
        _j,
        _len,
        _len1,
        _ref,
        _ref1;
    if (channel.isClient) {
      _ref = channel.connections;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        connection = _ref[_i];
        this.disconnectChannels(channel, connection);
      }
    } else {
      _ref1 = channel.connections;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        connection = _ref1[_j];
        this.disconnectChannels(connection, channel);
      }
    }
    clients = this.getClientChannels(channel.id);
    if (channel.isClient) {
      WeinreClientEvents.clientUnregistered(clients, channel.name);
    } else {
      WeinreClientEvents.targetUnregistered(clients, channel.name);
    }
    return delete this.channels[channel.name];
  };
  ChannelManager.prototype.getChannel = function(name, remoteAddress) {
    var channel;
    if (!_.has(this.channels, name)) {
      return null;
    }
    channel = this.channels[name];
    if (!channel) {
      return null;
    }
    return channel;
  };
  ChannelManager.prototype.connectChannels = function(client, target) {
    var clients;
    if (client.isClosed || target.isClosed) {
      return;
    }
    if (client.connections.length) {
      this.disconnectChannels(client, client.connections[0]);
    }
    client.connections.push(target);
    target.connections.push(client);
    clients = this.getClientChannels(client.id);
    WeinreClientEvents.connectionCreated(clients, client.name, target.name);
    return WeinreTargetEvents.connectionCreated(target, client.name, target.name);
  };
  ChannelManager.prototype.disconnectChannels = function(client, target) {
    var clients;
    clients = this.getClientChannels(client.id);
    WeinreClientEvents.connectionDestroyed(clients, client.name, target.name);
    WeinreTargetEvents.connectionDestroyed(target, client.name, target.name);
    client.connections = _.without(client.connections, target);
    return target.connections = _.without(target.connections, client);
  };
  ChannelManager.prototype.getChannels = function(id) {
    if (id != null) {
      return _.filter(this.channels, function(item) {
        return item.id === id;
      });
    } else {
      return _.values(this.channels);
    }
  };
  ChannelManager.prototype.getClientChannels = function(id) {
    return _.filter(this.channels, function(item) {
      return item.isClient && item.id === id;
    });
  };
  ChannelManager.prototype.getTargetChannels = function(id) {
    return _.filter(this.channels, function(item) {
      return item.isTarget && item.id === id;
    });
  };
  return ChannelManager;
})());
module.exports = new ChannelManager;
