/* */ 
var MessageHandler,
    channelManager,
    serviceManager,
    utils,
    __slice = [].slice;
utils = require('./utils');
channelManager = require('./channelManager');
serviceManager = require('./serviceManager');
utils.registerClass(MessageHandler = (function() {
  function MessageHandler() {}
  MessageHandler.prototype.handleMessage = function(channel, message) {
    return this._serviceMethodInvoker(channel, message["interface"], message.method, message.args);
  };
  MessageHandler.prototype._serviceMethodInvoker = function(channel, intfName, method, args) {
    var e,
        methodSignature,
        service;
    methodSignature = "" + intfName + "." + method + "()";
    service = serviceManager.get(intfName);
    if (!service) {
      return this._redirectToConnections(channel, intfName, method, args);
    }
    args = args.slice();
    args.unshift(channel);
    try {
      return service[method].apply(service, args);
    } catch (_error) {
      e = _error;
      utils.log("error running service method " + methodSignature + ": " + e);
      return utils.log("stack:\n" + e.stack);
    }
  };
  MessageHandler.prototype._redirectToConnections = function(channel, intfName, method, args) {
    var connection,
        _i,
        _len,
        _ref,
        _results;
    _ref = channel.connections;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      connection = _ref[_i];
      _results.push(connection.sendMessage.apply(connection, [intfName, method].concat(__slice.call(args))));
    }
    return _results;
  };
  return MessageHandler;
})());
module.exports = new MessageHandler;
