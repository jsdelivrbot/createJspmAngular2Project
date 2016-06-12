/* */ 
var HTTPServer = require('./http').Server,
    HTTPSServer = require('./https').Server,
    fs = require('fs');
require('./patch');
exports = module.exports = createServer;
exports.version = '1.9.2';
function createServer() {
  if ('object' == typeof arguments[0]) {
    return new HTTPSServer(arguments[0], Array.prototype.slice.call(arguments, 1));
  } else {
    return new HTTPServer(Array.prototype.slice.call(arguments));
  }
}
;
exports.createServer = createServer;
exports.middleware = {};
fs.readdirSync(__dirname + '/middleware').forEach(function(filename) {
  if (/\.js$/.test(filename)) {
    var name = filename.substr(0, filename.lastIndexOf('.'));
    exports.middleware.__defineGetter__(name, function() {
      return require('./middleware/' + name);
    });
  }
});
exports.utils = require('./utils');
exports.utils.merge(exports, exports.middleware);
exports.HTTPServer = HTTPServer;
exports.HTTPSServer = HTTPSServer;
