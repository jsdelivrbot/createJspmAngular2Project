/* */ 
var zlib = require('zlib');
exports.methods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
};
exports.filter = function(req, res) {
  var type = res.getHeader('Content-Type') || '';
  return type.match(/json|text|javascript/);
};
module.exports = function compress(options) {
  var options = options || {},
      names = Object.keys(exports.methods),
      filter = options.filter || exports.filter;
  return function(req, res, next) {
    var accept = req.headers['accept-encoding'],
        write = res.write,
        writeHead = res.writeHead,
        end = res.end,
        stream,
        method;
    res.setHeader('Vary', 'Accept-Encoding');
    res.write = function(chunk, encoding) {
      if (!this._header)
        this._implicitHeader();
      return stream ? stream.write(chunk, encoding) : write.call(this, chunk, encoding);
    };
    res.end = function(chunk, encoding) {
      if (!this._header) {
        this._implicitHeader();
      }
      if (chunk)
        this.write(chunk, encoding);
      return stream ? stream.end() : end.call(this);
    };
    res.writeHead = function() {
      res.writeHead = writeHead;
      if (filter(req, res) && accept && 'HEAD' != req.method) {
        if ('*' == accept.trim()) {
          method = 'gzip';
        } else {
          for (var i = 0,
              len = names.length; i < len; ++i) {
            if (~accept.indexOf(names[i])) {
              method = names[i];
              break;
            }
          }
        }
        if (method) {
          stream = exports.methods[method](options);
          res.setHeader('Content-Encoding', method);
          res.removeHeader('Content-Length');
          stream.on('data', function(chunk) {
            write.call(res, chunk);
          });
          stream.on('end', function() {
            end.call(res);
          });
          stream.on('drain', function() {
            res.emit('drain');
          });
        }
      }
      return res.writeHead.apply(this, arguments);
    };
    next();
  };
};
