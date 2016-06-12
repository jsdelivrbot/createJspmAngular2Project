/* */ 
var path = require('path'),
    fs = require('fs');
var mime = module.exports = {
  types: {},
  extensions: {},
  define: function(map) {
    for (var type in map) {
      var exts = map[type];
      for (var i = 0; i < exts.length; i++) {
        mime.types[exts[i]] = type;
      }
      if (!mime.extensions[type]) {
        mime.extensions[type] = exts[0];
      }
    }
  },
  load: function(file) {
    var map = {},
        content = fs.readFileSync(file, 'ascii'),
        lines = content.split(/[\r\n]+/);
    lines.forEach(function(line, lineno) {
      var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
      map[fields.shift()] = fields;
    });
    mime.define(map);
  },
  lookup: function(path, fallback) {
    var ext = path.replace(/.*[\.\/]/, '').toLowerCase();
    return mime.types[ext] || fallback || mime.default_type;
  },
  extension: function(mimeType) {
    return mime.extensions[mimeType];
  },
  charsets: {lookup: function(mimeType, fallback) {
      return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
    }}
};
mime.load(path.join(__dirname, 'types/mime.types'));
mime.load(path.join(__dirname, 'types/node.types'));
mime.default_type = mime.types.bin;
