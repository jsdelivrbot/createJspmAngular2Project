/* */ 
(function(process) {
  var MessageQueue,
      utils,
      _;
  _ = require('underscore');
  utils = require('./utils');
  module.exports = utils.registerClass(MessageQueue = (function() {
    function MessageQueue() {
      this.messages = [];
      this.closed = false;
      this.callback = null;
      this.timer = null;
      _.bindAll(this, '_timerExpired', '_updated');
    }
    MessageQueue.prototype.shutdown = function() {
      if (this.closed) {
        return;
      }
      this.closed = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.callback) {
        this.callback.call(null, this.messages);
      }
      this.callback = null;
      this.messages = null;
      return this.timer = null;
    };
    MessageQueue.prototype.push = function(message) {
      if (this.closed) {
        return;
      }
      this.messages.push(message);
      return process.nextTick(this._updated);
    };
    MessageQueue.prototype.pullAll = function(timeout, callback) {
      if (this.closed) {
        return callback.call(null, null);
      }
      if (this.callback) {
        return callback.call(null, []);
      }
      if (this.messages.length) {
        callback.call(null, this.messages);
        this.messages = [];
        return;
      }
      this.callback = callback;
      return this.timer = setTimeout(this._timerExpired, timeout);
    };
    MessageQueue.prototype._timerExpired = function() {
      return this._updated();
    };
    MessageQueue.prototype._updated = function() {
      var callback,
          messages;
      if (this.closed) {
        return;
      }
      if (!this.callback) {
        return;
      }
      callback = this.callback;
      messages = this.messages;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.callback = null;
      this.messages = [];
      this.timer = null;
      return callback.call(null, messages);
    };
    return MessageQueue;
  })());
})(require('process'));
