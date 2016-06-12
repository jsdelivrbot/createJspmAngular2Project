/* */ 
(function(Buffer) {
  var http = require('http');
  var fs = require('fs');
  var path = require('path');
  var config = require('./config');
  var svg = publicFile(config.defaults.public.svg);
  var indexPage = publicFile(config.defaults.indexPage);
  var header = staticFile(config.defaults.components.header);
  var footer = staticFile(config.defaults.components.footer);
  var zlib = require('zlib');
  function startServer(ui) {
    var connect = ui.bs.utils.connect;
    var serveStatic = ui.bs.utils.serveStatic;
    var app = connect();
    var socketJs = getSocketJs(ui);
    var jsFilename = "/" + md5(socketJs, 10) + ".js";
    app.use(serveFile(config.defaults.socketJs, "js", socketJs));
    app.use(serveFile(config.defaults.pagesConfig, "js", ui.pagesConfig));
    app.use(serveFile(config.defaults.clientJs, "js", ui.clientJs));
    insertPageMarkupFromHooks(app, ui.pages, indexPage.replace("%pageMarkup%", ui.pageMarkup).replace("%templates%", ui.templates).replace("%svg%", svg).replace("%header%", header).replace(/%footer%/g, footer));
    app.use(serveStatic(path.join(__dirname, "../public")));
    app.use(serveStatic(publicDir("")));
    app.use(require('connect-history-api-fallback'));
    app.use("/node_modules", serveStatic(packageDir("node_modules")));
    return {
      server: http.createServer(app),
      app: app
    };
  }
  function insertPageMarkupFromHooks(app, pages, markup) {
    var cached;
    app.use(function(req, res, next) {
      if (req.url === "/" || pages[req.url.slice(1)]) {
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Content-Encoding": "gzip"
        });
        if (!cached) {
          var buf = new Buffer(markup, "utf-8");
          zlib.gzip(buf, function(_, result) {
            cached = result;
            res.end(result);
          });
        } else {
          res.end(cached);
        }
      } else {
        next();
      }
    });
  }
  var gzipCache = {};
  function serveFile(path, type, string) {
    var typemap = {
      js: "application/javascript",
      css: "text/css"
    };
    return function(req, res, next) {
      if (req.url !== path) {
        return next();
      }
      res.writeHead(200, {
        "Content-Type": typemap[type],
        "Content-Encoding": "gzip",
        "Cache-Control": "public, max-age=2592000000",
        "Expires": new Date(Date.now() + 2592000000).toUTCString()
      });
      if (gzipCache[path]) {
        return res.end(gzipCache[path]);
      }
      var buf = new Buffer(string, "utf-8");
      zlib.gzip(buf, function(_, result) {
        gzipCache[path] = result;
        res.end(result);
      });
    };
  }
  function getSocketJs(cp) {
    return [cp.bs.getSocketIoScript(), cp.bs.getExternalSocketConnector({namespace: "/browser-sync-cp"})].join(";");
  }
  function md5(src, length) {
    var crypto = require('crypto');
    var hash = crypto.createHash("md5").update(src, "utf8").digest("hex");
    return hash.slice(0, length);
  }
  function publicDir(filepath) {
    return path.join(__dirname, "/../public" + filepath) || "";
  }
  function staticDir(filepath) {
    return path.join(__dirname, "/../static" + filepath) || "";
  }
  function publicFile(filepath) {
    return fs.readFileSync(publicDir(filepath), "utf-8");
  }
  function staticFile(filepath) {
    return fs.readFileSync(staticDir(filepath), "utf-8");
  }
  function packageDir(filepath) {
    return path.join(__dirname, "/../" + filepath);
  }
  module.exports = startServer;
})(require('buffer').Buffer);
