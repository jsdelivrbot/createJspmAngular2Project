/* */ 
(function(process) {
  var http = require('http'),
      parse = require('url').parse,
      assert = require('assert'),
      utils = require('./utils');
  var env = process.env.NODE_ENV || 'development';
  var Server = exports.Server = function HTTPServer(middleware) {
    this.stack = [];
    middleware.forEach(function(fn) {
      this.use(fn);
    }, this);
    http.Server.call(this, this.handle);
  };
  Server.prototype.__proto__ = http.Server.prototype;
  Server.prototype.use = function(route, handle) {
    this.route = '/';
    if ('string' != typeof route) {
      handle = route;
      route = '/';
    }
    if ('function' == typeof handle.handle) {
      var server = handle;
      server.route = route;
      handle = function(req, res, next) {
        server.handle(req, res, next);
      };
    }
    if (handle instanceof http.Server) {
      handle = handle.listeners('request')[0];
    }
    if ('/' == route[route.length - 1]) {
      route = route.substr(0, route.length - 1);
    }
    this.stack.push({
      route: route,
      handle: handle
    });
    return this;
  };
  Server.prototype.handle = function(req, res, out) {
    var writeHead = res.writeHead,
        stack = this.stack,
        removed = '',
        index = 0;
    function next(err) {
      var layer,
          path,
          c;
      req.url = removed + req.url;
      req.originalUrl = req.originalUrl || req.url;
      removed = '';
      layer = stack[index++];
      if (!layer || res.headerSent) {
        if (out)
          return out(err);
        if (err) {
          var msg = 'production' == env ? 'Internal Server Error' : err.stack || err.toString();
          if ('test' != env)
            console.error(err.stack || err.toString());
          if (res.headerSent)
            return req.socket.destroy();
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          if ('HEAD' == req.method)
            return res.end();
          res.end(msg);
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          if ('HEAD' == req.method)
            return res.end();
          res.end('Cannot ' + req.method + ' ' + utils.escape(req.originalUrl));
        }
        return;
      }
      try {
        path = parse(req.url).pathname;
        if (undefined == path)
          path = '/';
        if (0 != path.indexOf(layer.route))
          return next(err);
        c = path[layer.route.length];
        if (c && '/' != c && '.' != c)
          return next(err);
        removed = layer.route;
        req.url = req.url.substr(removed.length);
        if ('/' != req.url[0])
          req.url = '/' + req.url;
        var arity = layer.handle.length;
        if (err) {
          if (arity === 4) {
            layer.handle(err, req, res, next);
          } else {
            next(err);
          }
        } else if (arity < 4) {
          layer.handle(req, res, next);
        } else {
          next();
        }
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          console.error(e.stack + '\n');
          next(e);
        } else {
          next(e);
        }
      }
    }
    next();
  };
})(require('process'));
