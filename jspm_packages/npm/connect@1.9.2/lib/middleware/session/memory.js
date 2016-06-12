/* */ 
(function(process) {
  var Store = require('./store'),
      utils = require('../../utils'),
      Session = require('./session');
  var MemoryStore = module.exports = function MemoryStore() {
    this.sessions = {};
  };
  MemoryStore.prototype.__proto__ = Store.prototype;
  MemoryStore.prototype.get = function(sid, fn) {
    var self = this;
    process.nextTick(function() {
      var expires,
          sess = self.sessions[sid];
      if (sess) {
        sess = JSON.parse(sess);
        expires = 'string' == typeof sess.cookie.expires ? new Date(sess.cookie.expires) : sess.cookie.expires;
        if (!expires || new Date < expires) {
          fn(null, sess);
        } else {
          self.destroy(sid, fn);
        }
      } else {
        fn();
      }
    });
  };
  MemoryStore.prototype.set = function(sid, sess, fn) {
    var self = this;
    process.nextTick(function() {
      self.sessions[sid] = JSON.stringify(sess);
      fn && fn();
    });
  };
  MemoryStore.prototype.destroy = function(sid, fn) {
    var self = this;
    process.nextTick(function() {
      delete self.sessions[sid];
      fn && fn();
    });
  };
  MemoryStore.prototype.all = function(fn) {
    var arr = [],
        keys = Object.keys(this.sessions);
    for (var i = 0,
        len = keys.length; i < len; ++i) {
      arr.push(this.sessions[keys[i]]);
    }
    fn(null, arr);
  };
  MemoryStore.prototype.clear = function(fn) {
    this.sessions = {};
    fn && fn();
  };
  MemoryStore.prototype.length = function(fn) {
    fn(null, Object.keys(this.sessions).length);
  };
})(require('process'));
