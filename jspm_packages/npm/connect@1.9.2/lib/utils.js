/* */ 
var crypto = require('crypto'),
    Path = require('path'),
    fs = require('fs');
exports.flatten = function(arr, ret) {
  var ret = ret || [],
      len = arr.length;
  for (var i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      exports.flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};
exports.md5 = function(str, encoding) {
  return crypto.createHash('md5').update(str).digest(encoding || 'hex');
};
exports.merge = function(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
exports.escape = function(html) {
  return String(html).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
exports.uid = function(len) {
  var buf = [],
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      charlen = chars.length;
  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }
  return buf.join('');
};
exports.parseCookie = function(str) {
  var obj = {},
      pairs = str.split(/[;,] */);
  for (var i = 0,
      len = pairs.length; i < len; ++i) {
    var pair = pairs[i],
        eqlIndex = pair.indexOf('='),
        key = pair.substr(0, eqlIndex).trim().toLowerCase(),
        val = pair.substr(++eqlIndex, pair.length).trim();
    if ('"' == val[0])
      val = val.slice(1, -1);
    if (undefined == obj[key]) {
      val = val.replace(/\+/g, ' ');
      try {
        obj[key] = decodeURIComponent(val);
      } catch (err) {
        if (err instanceof URIError) {
          obj[key] = val;
        } else {
          throw err;
        }
      }
    }
  }
  return obj;
};
exports.serializeCookie = function(name, val, obj) {
  var pairs = [name + '=' + encodeURIComponent(val)],
      obj = obj || {};
  if (obj.domain)
    pairs.push('domain=' + obj.domain);
  if (obj.path)
    pairs.push('path=' + obj.path);
  if (obj.expires)
    pairs.push('expires=' + obj.expires.toUTCString());
  if (obj.httpOnly)
    pairs.push('httpOnly');
  if (obj.secure)
    pairs.push('secure');
  return pairs.join('; ');
};
exports.pause = function(obj) {
  var onData,
      onEnd,
      events = [];
  obj.on('data', onData = function(data, encoding) {
    events.push(['data', data, encoding]);
  });
  obj.on('end', onEnd = function(data, encoding) {
    events.push(['end', data, encoding]);
  });
  return {
    end: function() {
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function() {
      this.end();
      for (var i = 0,
          len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};
exports.modified = function(req, res, headers) {
  var headers = headers || res._headers || {},
      modifiedSince = req.headers['if-modified-since'],
      lastModified = headers['last-modified'],
      noneMatch = req.headers['if-none-match'],
      etag = headers['etag'];
  if (noneMatch)
    noneMatch = noneMatch.split(/ *, */);
  if (noneMatch && etag && ~noneMatch.indexOf(etag)) {
    return false;
  }
  if (modifiedSince && lastModified) {
    modifiedSince = new Date(modifiedSince);
    lastModified = new Date(lastModified);
    if (!isNaN(modifiedSince.getTime())) {
      if (lastModified <= modifiedSince)
        return false;
    }
  }
  return true;
};
exports.removeContentHeaders = function(res) {
  Object.keys(res._headers).forEach(function(field) {
    if (0 == field.indexOf('content')) {
      res.removeHeader(field);
    }
  });
};
exports.conditionalGET = function(req) {
  return req.headers['if-modified-since'] || req.headers['if-none-match'];
};
exports.forbidden = function(res) {
  var body = 'Forbidden';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.statusCode = 403;
  res.end(body);
};
exports.unauthorized = function(res, realm) {
  res.statusCode = 401;
  res.setHeader('WWW-Authenticate', 'Basic realm="' + realm + '"');
  res.end('Unauthorized');
};
exports.badRequest = function(res) {
  res.statusCode = 400;
  res.end('Bad Request');
};
exports.notModified = function(res) {
  exports.removeContentHeaders(res);
  res.statusCode = 304;
  res.end();
};
exports.etag = function(stat) {
  return '"' + stat.size + '-' + Number(stat.mtime) + '"';
};
exports.parseRange = function(size, str) {
  var valid = true;
  var arr = str.substr(6).split(',').map(function(range) {
    var range = range.split('-'),
        start = parseInt(range[0], 10),
        end = parseInt(range[1], 10);
    if (isNaN(start)) {
      start = size - end;
      end = size - 1;
    } else if (isNaN(end)) {
      end = size - 1;
    }
    if (isNaN(start) || isNaN(end) || start > end)
      valid = false;
    return {
      start: start,
      end: end
    };
  });
  return valid ? arr : undefined;
};
exports.parseCacheControl = function(str) {
  var directives = str.split(','),
      obj = {};
  for (var i = 0,
      len = directives.length; i < len; i++) {
    var parts = directives[i].split('='),
        key = parts.shift().trim(),
        val = parseInt(parts.shift(), 10);
    obj[key] = isNaN(val) ? true : val;
  }
  return obj;
};
var toArray = exports.toArray = function(obj) {
  var len = obj.length,
      arr = new Array(len);
  for (var i = 0; i < len; ++i) {
    arr[i] = obj[i];
  }
  return arr;
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
