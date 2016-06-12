/* */ 
var HTTPServer = require('./http').Server,
    https = require('https');
var Server = exports.Server = function HTTPSServer(options, middleware) {
  this.stack = [];
  middleware.forEach(function(fn) {
    this.use(fn);
  }, this);
  https.Server.call(this, options, this.handle);
};
Server.prototype.__proto__ = https.Server.prototype;
Object.keys(HTTPServer.prototype).forEach(function(method) {
  Server.prototype[method] = HTTPServer.prototype[method];
});
