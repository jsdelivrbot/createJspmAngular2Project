/* */ 
var http = require('http'),
    utils = require('../utils'),
    Cache = require('../cache'),
    url = require('url'),
    fs = require('fs');
module.exports = function staticCache(options) {
  var options = options || {},
      cache = new Cache(options.maxObjects || 128),
      maxlen = options.maxLength || 1024 * 256;
  return function staticCache(req, res, next) {
    var path = url.parse(req.url).pathname,
        ranges = req.headers.range,
        hit = cache.get(path),
        hitCC,
        uaCC,
        header,
        age;
    req.on('static', function(stream) {
      var headers = res._headers,
          cc = utils.parseCacheControl(headers['cache-control'] || ''),
          contentLength = headers['content-length'],
          hit;
      if (!contentLength || contentLength > maxlen)
        return;
      if (cc['no-cache'] || cc['no-store'] || cc['private'] || cc['must-revalidate'])
        return;
      if (hit = cache.get(path)) {
        if (headers.etag == hit[0].etag) {
          hit[0].date = new Date;
          return;
        } else {
          cache.remove(path);
        }
      }
      if (null == stream)
        return;
      var arr = cache.add(path);
      arr.push(headers);
      stream.on('data', function(chunk) {
        arr.push(chunk);
      });
      stream.on('end', function() {
        arr.complete = true;
      });
    });
    if (hit && hit.complete && !ranges) {
      header = utils.merge({}, hit[0]);
      header.Age = age = (new Date - new Date(header.date)) / 1000 | 0;
      header.date = new Date().toUTCString();
      hitCC = utils.parseCacheControl(header['cache-control'] || '');
      uaCC = utils.parseCacheControl(req.headers['cache-control'] || '');
      if (hitCC['no-cache'] || uaCC['no-cache'])
        return next();
      if (isStale(hitCC, age) || isStale(uaCC, age))
        return next();
      if (utils.conditionalGET(req)) {
        if (!utils.modified(req, res, header)) {
          header['content-length'] = 0;
          res.writeHead(304, header);
          return res.end();
        }
      }
      if ('HEAD' == req.method) {
        header['content-length'] = 0;
        res.writeHead(200, header);
        return res.end();
      }
      res.writeHead(200, header);
      function write(i) {
        var buf = hit[i];
        if (!buf)
          return res.end();
        if (false === res.write(buf)) {
          res.once('drain', function() {
            write(++i);
          });
        } else {
          write(++i);
        }
      }
      return write(1);
    }
    next();
  };
};
function isStale(cc, age) {
  return cc['max-age'] && cc['max-age'] <= age;
}
