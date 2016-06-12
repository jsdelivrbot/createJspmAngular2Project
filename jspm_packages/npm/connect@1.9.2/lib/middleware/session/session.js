/* */ 
var utils = require('../../utils'),
    Cookie = require('./cookie');
var Session = module.exports = function Session(req, data) {
  Object.defineProperty(this, 'req', {value: req});
  Object.defineProperty(this, 'id', {value: req.sessionID});
  if ('object' == typeof data) {
    utils.merge(this, data);
  } else {
    this.lastAccess = Date.now();
  }
};
Session.prototype.touch = function() {
  return this.resetLastAccess().resetMaxAge();
};
Session.prototype.resetLastAccess = function() {
  this.lastAccess = Date.now();
  return this;
};
Session.prototype.resetMaxAge = function() {
  this.cookie.maxAge = this.cookie.originalMaxAge;
  return this;
};
Session.prototype.save = function(fn) {
  this.req.sessionStore.set(this.id, this, fn || function() {});
  return this;
};
Session.prototype.reload = function(fn) {
  var req = this.req,
      store = this.req.sessionStore;
  store.get(this.id, function(err, sess) {
    if (err)
      return fn(err);
    if (!sess)
      return fn(new Error('failed to load session'));
    store.createSession(req, sess);
    fn();
  });
  return this;
};
Session.prototype.destroy = function(fn) {
  delete this.req.session;
  this.req.sessionStore.destroy(this.id, fn);
  return this;
};
Session.prototype.regenerate = function(fn) {
  this.req.sessionStore.regenerate(this.req, fn);
  return this;
};
