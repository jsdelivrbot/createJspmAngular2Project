/* */ 
var path = require('path');
path.isAbsolute = (path.isAbsolute) ? path.isAbsolute : require('path-is-absolute');
var fs = require('graceful-fs');
function symlinkPaths(srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, function(err, stat) {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink');
        return callback(err);
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      });
    });
  } else {
    var dstdir = path.dirname(dstpath);
    var relativeToDst = path.join(dstdir, srcpath);
    return fs.exists(relativeToDst, function(exists) {
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        });
      } else {
        return fs.lstat(srcpath, function(err, stat) {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            return callback(err);
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          });
        });
      }
    });
  }
}
function symlinkPathsSync(srcpath, dstpath) {
  var exists;
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath);
    if (!exists)
      throw new Error('absolute srcpath does not exist');
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    };
  } else {
    var dstdir = path.dirname(dstpath);
    var relativeToDst = path.join(dstdir, srcpath);
    exists = fs.existsSync(relativeToDst);
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      };
    } else {
      exists = fs.existsSync(srcpath);
      if (!exists)
        throw new Error('relative srcpath does not exist');
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      };
    }
  }
}
module.exports = {
  'symlinkPaths': symlinkPaths,
  'symlinkPathsSync': symlinkPathsSync
};
