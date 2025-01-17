/* */ 
(function(process) {
  module.exports = function(options) {
    var moment,
        parse,
        url;
    if (options == null) {
      options = {};
    }
    url = require('url');
    moment = require('moment');
    options.date || (options.date = 'YY.MM.DD HH:mm:ss');
    options.format || (options.format = '%date %status %method %url (%route - %time)');
    parse = function(req, res, format) {
      var status;
      format = format.replace(/%date/g, "\x1b[90m" + (moment().format(options.date)) + "\x1b[0m");
      format = format.replace(/%method/g, "\x1b[35m" + (req.method.toUpperCase()) + "\x1b[0m");
      format = format.replace(/%url/g, "\x1b[90m" + (decodeURI((url.parse(req.url)).pathname)) + "\x1b[0m");
      status = (function() {
        switch (true) {
          case 500 <= res.statusCode:
            return '\x1b[31m';
          case 400 <= res.statusCode:
            return '\x1b[33m';
          case 300 <= res.statusCode:
            return '\x1b[36m';
          case 200 <= res.statusCode:
            return '\x1b[32m';
        }
      })();
      format = format.replace(/%status/g, "" + status + res.statusCode + "\x1b[0m");
      format = format.replace(/%route/g, "\x1b[90m" + (req.route ? req.route.path : '\x1b[31mUnknown') + "\x1b[0m");
      format = format.replace(/%(date|time)/g, "\x1b[90m" + (new Date - req._startTime) + "ms\x1b[0m");
      return format;
    };
    return function(req, res, next) {
      var end;
      req._startTime = new Date;
      end = res.end;
      res.end = function(chunk, encoding) {
        var message;
        res.end = end;
        res.end(chunk, encoding);
        message = parse(req, res, options.format);
        return process.nextTick(function() {
          return console.log(message);
        });
      };
      return next();
    };
  };
})(require('process'));
