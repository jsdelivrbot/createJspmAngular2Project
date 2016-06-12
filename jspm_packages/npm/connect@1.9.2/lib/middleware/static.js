/* */ 
(function(Buffer) {
  var fs = require('fs'),
      path = require('path'),
      join = path.join,
      basename = path.basename,
      normalize = path.normalize,
      utils = require('../utils'),
      Buffer = require('buffer').Buffer,
      parse = require('url').parse,
      mime = require('mime');
  exports = module.exports = function static(root, options) {
    options = options || {};
    if (!root)
      throw new Error('static() root path required');
    options.root = root;
    return function static(req, res, next) {
      options.path = req.url;
      options.getOnly = true;
      send(req, res, next, options);
    };
  };
  exports.mime = mime;
  function invalidRange(res) {
    var body = 'Requested Range Not Satisfiable';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.statusCode = 416;
    res.end(body);
  }
  var send = exports.send = function(req, res, next, options) {
    options = options || {};
    if (!options.path)
      throw new Error('path required');
    var maxAge = options.maxAge || 0,
        ranges = req.headers.range,
        head = 'HEAD' == req.method,
        get = 'GET' == req.method,
        root = options.root ? normalize(options.root) : null,
        redirect = false === options.redirect ? false : true,
        getOnly = options.getOnly,
        fn = options.callback,
        hidden = options.hidden,
        done;
    if (fn)
      next = fn;
    if (getOnly && !get && !head)
      return next();
    var url = parse(options.path),
        path = decodeURIComponent(url.pathname),
        type;
    if (~path.indexOf('\0'))
      return utils.badRequest(res);
    if (!root && ~path.indexOf('..'))
      return utils.forbidden(res);
    path = normalize(join(root, path));
    if (root && 0 != path.indexOf(root))
      return fn ? fn(new Error('Forbidden')) : utils.forbidden(res);
    if (normalize('/') == path[path.length - 1])
      path += 'index.html';
    if (!hidden && '.' == basename(path)[0])
      return next();
    fs.stat(path, function(err, stat) {
      type = mime.lookup(path);
      if (err) {
        if (fn)
          return fn(err);
        return 'ENOENT' == err.code ? next() : next(err);
      } else if (stat.isDirectory()) {
        if (!redirect)
          return next();
        res.statusCode = 301;
        res.setHeader('Location', url.pathname + '/');
        res.end('Redirecting to ' + url.pathname + '/');
        return;
      }
      if (!res.getHeader('Date'))
        res.setHeader('Date', new Date().toUTCString());
      if (!res.getHeader('Cache-Control'))
        res.setHeader('Cache-Control', 'public, max-age=' + (maxAge / 1000));
      if (!res.getHeader('Last-Modified'))
        res.setHeader('Last-Modified', stat.mtime.toUTCString());
      if (!res.getHeader('ETag'))
        res.setHeader('ETag', utils.etag(stat));
      if (!res.getHeader('content-type')) {
        var charset = mime.charsets.lookup(type);
        res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
      }
      res.setHeader('Accept-Ranges', 'bytes');
      if (utils.conditionalGET(req)) {
        if (!utils.modified(req, res)) {
          req.emit('static');
          return utils.notModified(res);
        }
      }
      var opts = {};
      var chunkSize = stat.size;
      if (ranges) {
        ranges = utils.parseRange(stat.size, ranges);
        if (ranges) {
          opts.start = ranges[0].start;
          opts.end = ranges[0].end;
          chunkSize = opts.end - opts.start + 1;
          res.statusCode = 206;
          res.setHeader('Content-Range', 'bytes ' + opts.start + '-' + opts.end + '/' + stat.size);
        } else {
          return fn ? fn(new Error('Requested Range Not Satisfiable')) : invalidRange(res);
        }
      }
      res.setHeader('Content-Length', chunkSize);
      if (head)
        return res.end();
      var stream = fs.createReadStream(path, opts);
      req.emit('static', stream);
      stream.pipe(res);
      if (fn) {
        function callback(err) {
          done || fn(err);
          done = true;
        }
        req.on('close', callback);
        stream.on('end', callback);
      }
    });
  };
})(require('buffer').Buffer);
