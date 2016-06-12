/* */ 
var utils = require('../../utils');
var Cookie = module.exports = function Cookie(options) {
  this.path = '/';
  this.httpOnly = true;
  this.maxAge = 14400000;
  if (options)
    utils.merge(this, options);
  this.originalMaxAge = undefined == this.originalMaxAge ? this.maxAge : this.originalMaxAge;
};
Cookie.prototype = {
  set expires(date) {
    this._expires = date;
    this.originalMaxAge = this.maxAge;
  },
  get expires() {
    return this._expires;
  },
  set maxAge(ms) {
    this.expires = 'number' == typeof ms ? new Date(Date.now() + ms) : ms;
  },
  get maxAge() {
    return this.expires instanceof Date ? this.expires.valueOf() - Date.now() : this.expires;
  },
  get data() {
    return {
      originalMaxAge: this.originalMaxAge,
      expires: this._expires,
      secure: this.secure,
      httpOnly: this.httpOnly,
      domain: this.domain,
      path: this.path
    };
  },
  serialize: function(name, val) {
    return utils.serializeCookie(name, val, this.data);
  },
  toJSON: function() {
    return this.data;
  }
};
