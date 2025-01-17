/* */ 
var AnonymousId,
    Channel,
    MessageQueue,
    channelManager,
    genJSON,
    messageHandler,
    parseJSON,
    utils,
    _,
    __slice = [].slice;
_ = require('underscore');
utils = require('./utils');
channelManager = require('./channelManager');
messageHandler = require('./messageHandler');
MessageQueue = require('./MessageQueue');
AnonymousId = 'anonymous';
module.exports = utils.registerClass(Channel = (function() {
  function Channel(pathPrefix, id, remoteAddress, isClient) {
    var prefix;
    this.pathPrefix = pathPrefix;
    this.id = id;
    this.remoteAddress = remoteAddress;
    this.isClient = isClient;
    prefix = this.isClient ? 'c-' : 't-';
    this.name = "" + prefix + (utils.getNextSequenceNumber());
    this.messageQueue = new MessageQueue;
    this.isClosed = false;
    this.connections = [];
    this.isTarget = !this.isClient;
    this.readTimeout = utils.options.readTimeout * 1000;
    if (!this.id) {
      this.id = AnonymousId;
    }
    this.description = {
      channel: this.name,
      id: this.id,
      hostName: this.remoteAddress,
      remoteAddress: this.remoteAddress
    };
    this.updateLastRead();
    channelManager.created(this);
  }
  Channel.prototype.close = function() {
    if (this.isClosed) {
      return;
    }
    channelManager.destroyed(this);
    this.isClosed = true;
    return this.messageQueue.shutdown();
  };
  Channel.prototype.sendCallback = function() {
    var args,
        callbackId,
        intfName;
    intfName = arguments[0], callbackId = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (!callbackId) {
      return;
    }
    args.unshift(callbackId);
    return this.sendMessage.apply(this, [intfName, 'sendCallback'].concat(__slice.call(args)));
  };
  Channel.prototype.sendMessage = function() {
    var args,
        intfName,
        message,
        method;
    intfName = arguments[0], method = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    message = genJSON({
      "interface": intfName,
      method: method,
      args: args
    });
    return this.messageQueue.push(message);
  };
  Channel.prototype.handleMessages = function(messages) {
    var message,
        _i,
        _len,
        _results;
    _results = [];
    for (_i = 0, _len = messages.length; _i < _len; _i++) {
      message = messages[_i];
      message = parseJSON(message);
      if (!message) {
        continue;
      }
      _results.push(messageHandler.handleMessage(this, message));
    }
    return _results;
  };
  Channel.prototype.getMessages = function(callback) {
    this.updateLastRead();
    if (this.isClosed) {
      return callback.call(null, null);
    }
    return this.messageQueue.pullAll(this.readTimeout, callback);
  };
  Channel.prototype.updateLastRead = function() {
    return this.lastRead = (new Date).valueOf();
  };
  Channel.prototype.toString = function() {
    var connections;
    connections = _.map(this.connections, function(val) {
      return val.name;
    }).join(',');
    return "Channel(" + this.name + ", closed:" + this.isClosed + ", connections:[" + connections + "])";
  };
  return Channel;
})());
parseJSON = function(message) {
  var e;
  try {
    return JSON.parse(message);
  } catch (_error) {
    e = _error;
    return null;
  }
};
genJSON = function(message) {
  var e;
  try {
    return JSON.stringify(message);
  } catch (_error) {
    e = _error;
    return null;
  }
};
