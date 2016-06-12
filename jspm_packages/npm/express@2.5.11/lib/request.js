/* */ 
var http = require('http'),
    req = http.IncomingMessage.prototype,
    utils = require('./utils'),
    parse = require('url').parse,
    mime = require('mime');
var flashFormatters = exports.flashFormatters = {s: function(val) {
    return String(val);
  }};
req.header = function(name, defaultValue) {
  switch (name = name.toLowerCase()) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer || this.headers.referer || defaultValue;
    default:
      return this.headers[name] || defaultValue;
  }
};
req.get = function(field, param) {
  var val = this.header(field);
  if (!val)
    return '';
  var regexp = new RegExp(param + ' *= *(?:"([^"]+)"|([^;]+))', 'i');
  if (!regexp.exec(val))
    return '';
  return RegExp.$1 || RegExp.$2;
};
req.__defineGetter__('path', function() {
  return parse(this.url).pathname;
});
req.accepts = function(type) {
  var accept = this.header('Accept');
  if (type && '.' == type[0])
    type = type.substr(1);
  if (!accept || ~accept.indexOf('*/*')) {
    return true;
  } else if (type) {
    if (!~type.indexOf('/'))
      type = mime.lookup(type);
    if (~accept.indexOf(type))
      return true;
    type = type.split('/')[0] + '/*';
    return !!~accept.indexOf(type);
  } else {
    return false;
  }
};
req.param = function(name, defaultValue) {
  if (this.params && this.params.hasOwnProperty(name) && undefined !== this.params[name]) {
    return this.params[name];
  }
  if (undefined !== this.query[name]) {
    return this.query[name];
  }
  if (this.body && undefined !== this.body[name]) {
    return this.body[name];
  }
  return defaultValue;
};
req.flash = function(type, msg) {
  if (this.session === undefined)
    throw Error('req.flash() requires sessions');
  var msgs = this.session.flash = this.session.flash || {};
  if (type && msg) {
    var i = 2,
        args = arguments,
        formatters = this.app.flashFormatters || {};
    formatters.__proto__ = flashFormatters;
    msg = utils.miniMarkdown(msg);
    msg = msg.replace(/%([a-zA-Z])/g, function(_, format) {
      var formatter = formatters[format];
      if (formatter)
        return formatter(utils.escape(args[i++]));
    });
    return (msgs[type] = msgs[type] || []).push(msg);
  } else if (type) {
    var arr = msgs[type];
    delete msgs[type];
    return arr || [];
  } else {
    this.session.flash = {};
    return msgs;
  }
};
req.is = function(type) {
  var fn = this.app.is(type);
  if (fn)
    return fn(this);
  var ct = this.headers['content-type'];
  if (!ct)
    return false;
  ct = ct.split(';')[0];
  if (!~type.indexOf('/'))
    type = mime.lookup(type);
  if (~type.indexOf('*')) {
    type = type.split('/');
    ct = ct.split('/');
    if ('*' == type[0] && type[1] == ct[1])
      return true;
    if ('*' == type[1] && type[0] == ct[0])
      return true;
    return false;
  }
  return !!~ct.indexOf(type);
};
function isxhr() {
  return this.header('X-Requested-With', '').toLowerCase() === 'xmlhttprequest';
}
req.__defineGetter__('isXMLHttpRequest', isxhr);
req.__defineGetter__('xhr', isxhr);
req.__defineGetter__('protocol', function() {
  var trustProxy = this.app.set('trust proxy');
  return this.connection.encrypted ? 'https' : trustProxy ? (this.header('X-Forwarded-Proto') || 'http') : 'http';
});
req.__defineGetter__('secure', function() {
  return 'https' == this.protocol;
});
