/* */ 
(function(process) {
  var utils = require('../utils'),
      url = require('url'),
      fs = require('fs');
  exports = module.exports = function errorHandler(options) {
    options = options || {};
    var showStack = options.showStack || options.stack,
        showMessage = options.showMessage || options.message,
        dumpExceptions = options.dumpExceptions || options.dump,
        formatUrl = options.formatUrl;
    return function errorHandler(err, req, res, next) {
      res.statusCode = 500;
      if (dumpExceptions)
        console.error(err.stack);
      if (showStack) {
        var accept = req.headers.accept || '';
        if (~accept.indexOf('html')) {
          fs.readFile(__dirname + '/../public/style.css', 'utf8', function(e, style) {
            fs.readFile(__dirname + '/../public/error.html', 'utf8', function(e, html) {
              var stack = (err.stack || '').split('\n').slice(1).map(function(v) {
                return '<li>' + v + '</li>';
              }).join('');
              html = html.replace('{style}', style).replace('{stack}', stack).replace('{title}', exports.title).replace(/\{error\}/g, utils.escape(err.toString()));
              res.setHeader('Content-Type', 'text/html');
              res.end(html);
            });
          });
        } else if (~accept.indexOf('json')) {
          var json = JSON.stringify({error: err});
          res.setHeader('Content-Type', 'application/json');
          res.end(json);
        } else {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(err.stack);
        }
      } else {
        var body = showMessage ? err.toString() : 'Internal Server Error';
        res.setHeader('Content-Type', 'text/plain');
        res.end(body);
      }
    };
  };
  exports.title = 'Connect';
})(require('process'));
