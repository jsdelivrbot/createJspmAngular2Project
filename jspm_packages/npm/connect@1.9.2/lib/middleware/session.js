/* */ 
(function(process) {
  var Session = require('./session/session'),
      MemoryStore = require('./session/memory'),
      Cookie = require('./session/cookie'),
      Store = require('./session/store'),
      utils = require('../utils'),
      parse = require('url').parse,
      crypto = require('crypto');
  var env = process.env.NODE_ENV;
  exports = module.exports = session;
  exports.Store = Store;
  exports.Cookie = Cookie;
  exports.Session = Session;
  exports.MemoryStore = MemoryStore;
  var warning = 'Warning: connection.session() MemoryStore is not\n' + 'designed for a production environment, as it will leak\n' + 'memory, and obviously only work within a single process.';
  function defaultFingerprint(req) {
    return '';
  }
  ;
  exports.ignore = [];
  function session(options) {
    var options = options || {},
        key = options.key || 'connect.sid',
        secret = options.secret,
        store = options.store || new MemoryStore,
        fingerprint = options.fingerprint || defaultFingerprint,
        cookie = options.cookie;
    if ('production' == env && store instanceof MemoryStore) {
      console.warn(warning);
    }
    if (!secret) {
      throw new Error('connect.session({ secret: "string" }) required for security');
    }
    store.hash = function(req, base) {
      return crypto.createHmac('sha256', secret).update(base + fingerprint(req)).digest('base64').replace(/=*$/, '');
    };
    store.generate = function(req) {
      var base = utils.uid(24);
      var sessionID = base + '.' + store.hash(req, base);
      req.sessionID = sessionID;
      req.session = new Session(req);
      req.session.cookie = new Cookie(cookie);
    };
    return function session(req, res, next) {
      if (req.session)
        return next();
      var url = parse(req.url),
          path = url.pathname;
      if (~exports.ignore.indexOf(path))
        return next();
      req.sessionStore = store;
      var writeHead = res.writeHead;
      res.writeHead = function(status, headers) {
        if (req.session) {
          var cookie = req.session.cookie;
          var secured = cookie.secure && (req.connection.encrypted || req.connection.proxySecure);
          if (secured || !cookie.secure) {
            res.setHeader('Set-Cookie', cookie.serialize(key, req.sessionID));
          }
        }
        res.writeHead = writeHead;
        return res.writeHead(status, headers);
      };
      var end = res.end;
      res.end = function(data, encoding) {
        res.end = end;
        if (req.session) {
          if (!res._header)
            res._implicitHeader();
          req.session.resetMaxAge();
          req.session.save(function() {
            res.end(data, encoding);
          });
        } else {
          res.end(data, encoding);
        }
      };
      function hash(base) {
        return store.hash(req, base);
      }
      function generate() {
        store.generate(req);
      }
      req.sessionID = req.cookies[key];
      if (!req.sessionID) {
        generate();
        next();
        return;
      }
      var parts = req.sessionID.split('.');
      if (parts[1] != hash(parts[0])) {
        generate();
        next();
        return;
      }
      var pause = utils.pause(req);
      store.get(req.sessionID, function(err, sess) {
        var _next = next;
        next = function(err) {
          _next(err);
          pause.resume();
        };
        if (err) {
          if ('ENOENT' == err.code) {
            generate();
            next();
          } else {
            next(err);
          }
        } else if (!sess) {
          generate();
          next();
        } else {
          store.createSession(req, sess);
          next();
        }
      });
    };
  }
  ;
})(require('process'));
