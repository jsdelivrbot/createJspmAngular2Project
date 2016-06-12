/* */ 
var connect = require('connect'),
    HTTPServer = require('./http'),
    https = require('https');
exports = module.exports = HTTPSServer;
var app = HTTPSServer.prototype;
function HTTPSServer(options, middleware) {
  connect.HTTPSServer.call(this, options, []);
  this.init(middleware);
}
;
app.__proto__ = connect.HTTPSServer.prototype;
Object.keys(HTTPServer.prototype).forEach(function(method) {
  app[method] = HTTPServer.prototype[method];
});
