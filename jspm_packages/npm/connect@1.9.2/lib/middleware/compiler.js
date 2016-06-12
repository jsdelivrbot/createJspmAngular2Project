/* */ 
(function(process) {
  var fs = require('fs'),
      path = require('path'),
      parse = require('url').parse;
  var cache = {};
  exports = module.exports = function compiler(options) {
    options = options || {};
    var srcDir = options.src || process.cwd(),
        destDir = options.dest || srcDir,
        enable = options.enable;
    if (!enable || enable.length === 0) {
      throw new Error('compiler\'s "enable" option is not set, nothing will be compiled.');
    }
    return function compiler(req, res, next) {
      if ('GET' != req.method)
        return next();
      var pathname = parse(req.url).pathname;
      for (var i = 0,
          len = enable.length; i < len; ++i) {
        var name = enable[i],
            compiler = compilers[name];
        if (compiler.match.test(pathname)) {
          var src = (srcDir + pathname).replace(compiler.match, compiler.ext),
              dest = destDir + pathname;
          fs.stat(src, function(err, srcStats) {
            if (err) {
              if ('ENOENT' == err.code) {
                next();
              } else {
                next(err);
              }
            } else {
              fs.stat(dest, function(err, destStats) {
                if (err) {
                  if ('ENOENT' == err.code) {
                    compile();
                  } else {
                    next(err);
                  }
                } else {
                  if (srcStats.mtime > destStats.mtime) {
                    compile();
                  } else {
                    next();
                  }
                }
              });
            }
          });
          function compile() {
            fs.readFile(src, 'utf8', function(err, str) {
              if (err) {
                next(err);
              } else {
                compiler.compile(str, function(err, str) {
                  if (err) {
                    next(err);
                  } else {
                    fs.writeFile(dest, str, 'utf8', function(err) {
                      next(err);
                    });
                  }
                });
              }
            });
          }
          return;
        }
      }
      next();
    };
  };
  var compilers = exports.compilers = {
    sass: {
      match: /\.css$/,
      ext: '.sass',
      compile: function(str, fn) {
        var sass = cache.sass || (cache.sass = require('sass'));
        try {
          fn(null, sass.render(str));
        } catch (err) {
          fn(err);
        }
      }
    },
    less: {
      match: /\.css$/,
      ext: '.less',
      compile: function(str, fn) {
        var less = cache.less || (cache.less = require('less'));
        try {
          less.render(str, fn);
        } catch (err) {
          fn(err);
        }
      }
    },
    coffeescript: {
      match: /\.js$/,
      ext: '.coffee',
      compile: function(str, fn) {
        var coffee = cache.coffee || (cache.coffee = require('coffee-script'));
        try {
          fn(null, coffee.compile(str));
        } catch (err) {
          fn(err);
        }
      }
    }
  };
})(require('process'));
