/* */ 
(function(process) {
  var qs = require('qs'),
      connect = require('connect'),
      router = require('./router/index'),
      Router = require('./router/index'),
      view = require('./view'),
      toArray = require('./utils').toArray,
      methods = router.methods.concat('del', 'all'),
      url = require('url'),
      utils = connect.utils;
  exports = module.exports = HTTPServer;
  var app = HTTPServer.prototype;
  function HTTPServer(middleware) {
    connect.HTTPServer.call(this, []);
    this.init(middleware);
  }
  ;
  app.__proto__ = connect.HTTPServer.prototype;
  app.init = function(middleware) {
    var self = this;
    this.cache = {};
    this.settings = {};
    this.redirects = {};
    this.isCallbacks = {};
    this._locals = {};
    this.dynamicViewHelpers = {};
    this.errorHandlers = [];
    this.set('env', process.env.NODE_ENV || 'development');
    this.use(function(req, res, next) {
      req.query = req.query || {};
      res.setHeader('X-Powered-By', 'Express');
      req.app = res.app = self;
      req.res = res;
      res.req = req;
      req.next = next;
      if (req.url.indexOf('?') > 0) {
        var query = url.parse(req.url).query;
        req.query = qs.parse(query);
      }
      next();
    });
    if (middleware)
      middleware.forEach(self.use.bind(self));
    this.routes = new Router(this);
    this.__defineGetter__('router', function() {
      this.__usedRouter = true;
      return self.routes.middleware;
    });
    this.locals({
      settings: this.settings,
      app: this
    });
    this.configure('development', function() {
      this.enable('hints');
    });
    this.configure('production', function() {
      this.enable('view cache');
    });
    this.on('listening', this.registerErrorHandlers.bind(this));
    methods.forEach(function(method) {
      self.lookup[method] = function(path) {
        return self.routes.lookup(method, path);
      };
      self.match[method] = function(path) {
        return self.routes.match(method, path);
      };
      self.remove[method] = function(path) {
        return self.routes.lookup(method, path).remove();
      };
    });
    self.lookup.del = self.lookup.delete;
    self.match.del = self.match.delete;
    self.remove.del = self.remove.delete;
  };
  app.remove = function(path) {
    return this.routes.lookup('all', path).remove();
  };
  app.lookup = function(path) {
    return this.routes.lookup('all', path);
  };
  app.match = function(url) {
    return this.routes.match('all', url);
  };
  app.onvhost = function() {
    this.registerErrorHandlers();
  };
  app.registerErrorHandlers = function() {
    this.errorHandlers.forEach(function(fn) {
      this.use(function(err, req, res, next) {
        fn.apply(this, arguments);
      });
    }, this);
    return this;
  };
  app.use = function(route, middleware) {
    var app,
        base,
        handle;
    if ('string' != typeof route) {
      middleware = route, route = '/';
    }
    if (middleware.handle && middleware.set)
      app = middleware;
    if (app) {
      app.route = route;
      middleware = function(req, res, next) {
        var orig = req.app;
        app.handle(req, res, function(err) {
          req.app = res.app = orig;
          next(err);
        });
      };
    }
    connect.HTTPServer.prototype.use.call(this, route, middleware);
    if (app) {
      base = this.set('basepath') || this.route;
      if ('/' == base)
        base = '';
      base = base + (app.set('basepath') || app.route);
      app.set('basepath', base);
      app.parent = this;
      if (app.__mounted)
        app.__mounted.call(app, this);
    }
    return this;
  };
  app.mounted = function(fn) {
    this.__mounted = fn;
    return this;
  };
  app.register = function() {
    view.register.apply(this, arguments);
    return this;
  };
  app.helpers = app.locals = function(obj) {
    utils.merge(this._locals, obj);
    return this;
  };
  app.dynamicHelpers = function(obj) {
    utils.merge(this.dynamicViewHelpers, obj);
    return this;
  };
  app.param = function(name, fn) {
    var self = this,
        fns = [].slice.call(arguments, 1);
    if (Array.isArray(name)) {
      name.forEach(function(name) {
        fns.forEach(function(fn) {
          self.param(name, fn);
        });
      });
    } else if ('function' == typeof name) {
      this.routes.param(name);
    } else {
      if (':' == name[0])
        name = name.substr(1);
      fns.forEach(function(fn) {
        self.routes.param(name, fn);
      });
    }
    return this;
  };
  app.error = function(fn) {
    this.errorHandlers.push(fn);
    return this;
  };
  app.is = function(type, fn) {
    if (!fn)
      return this.isCallbacks[type];
    this.isCallbacks[type] = fn;
    return this;
  };
  app.set = function(setting, val) {
    if (val === undefined) {
      if (this.settings.hasOwnProperty(setting)) {
        return this.settings[setting];
      } else if (this.parent) {
        return this.parent.set(setting);
      }
    } else {
      this.settings[setting] = val;
      return this;
    }
  };
  app.enabled = function(setting) {
    return !!this.set(setting);
  };
  app.disabled = function(setting) {
    return !this.set(setting);
  };
  app.enable = function(setting) {
    return this.set(setting, true);
  };
  app.disable = function(setting) {
    return this.set(setting, false);
  };
  app.redirect = function(key, url) {
    this.redirects[key] = url;
    return this;
  };
  app.configure = function(env, fn) {
    var envs = 'all',
        args = toArray(arguments);
    fn = args.pop();
    if (args.length)
      envs = args;
    if ('all' == envs || ~envs.indexOf(this.settings.env))
      fn.call(this);
    return this;
  };
  methods.forEach(function(method) {
    app[method] = function(path) {
      if (1 == arguments.length)
        return this.routes.lookup(method, path);
      var args = [method].concat(toArray(arguments));
      if (!this.__usedRouter)
        this.use(this.router);
      return this.routes._route.apply(this.routes, args);
    };
  });
  app.all = function(path) {
    var args = arguments;
    if (1 == args.length)
      return this.routes.lookup('all', path);
    methods.forEach(function(method) {
      if ('all' == method || 'del' == method)
        return;
      app[method].apply(this, args);
    }, this);
    return this;
  };
  app.del = app.delete;
})(require('process'));
