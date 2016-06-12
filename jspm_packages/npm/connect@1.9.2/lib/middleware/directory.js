/* */ 
var fs = require('fs'),
    parse = require('url').parse,
    utils = require('../utils'),
    path = require('path'),
    normalize = path.normalize,
    extname = path.extname,
    join = path.join;
var cache = {};
exports = module.exports = function directory(root, options) {
  options = options || {};
  if (!root)
    throw new Error('directory() root path required');
  var hidden = options.hidden,
      icons = options.icons,
      filter = options.filter,
      root = normalize(root);
  return function directory(req, res, next) {
    var accept = req.headers.accept || 'text/plain',
        url = parse(req.url),
        dir = decodeURIComponent(url.pathname),
        path = normalize(join(root, dir)),
        originalUrl = parse(req.originalUrl),
        originalDir = decodeURIComponent(originalUrl.pathname),
        showUp = path != root && path != root + '/';
    if (~path.indexOf('\0'))
      return utils.badRequest(res);
    if (0 != path.indexOf(root))
      return utils.forbidden(res);
    fs.stat(path, function(err, stat) {
      if (err)
        return 'ENOENT' == err.code ? next() : next(err);
      if (!stat.isDirectory())
        return next();
      fs.readdir(path, function(err, files) {
        if (err)
          return next(err);
        if (!hidden)
          files = removeHidden(files);
        if (filter)
          files = files.filter(filter);
        files.sort();
        for (var key in exports) {
          if (~accept.indexOf(key) || ~accept.indexOf('*/*')) {
            exports[key](req, res, files, next, originalDir, showUp, icons);
            return;
          }
        }
        utils.notAcceptable(res);
      });
    });
  };
};
exports.html = function(req, res, files, next, dir, showUp, icons) {
  fs.readFile(__dirname + '/../public/directory.html', 'utf8', function(err, str) {
    if (err)
      return next(err);
    fs.readFile(__dirname + '/../public/style.css', 'utf8', function(err, style) {
      if (err)
        return next(err);
      if (showUp)
        files.unshift('..');
      str = str.replace('{style}', style).replace('{files}', html(files, dir, icons)).replace('{directory}', dir).replace('{linked-path}', htmlPath(dir));
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', str.length);
      res.end(str);
    });
  });
};
exports.json = function(req, res, files) {
  files = JSON.stringify(files);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', files.length);
  res.end(files);
};
exports.plain = function(req, res, files) {
  files = files.join('\n') + '\n';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', files.length);
  res.end(files);
};
function htmlPath(dir) {
  var curr = [];
  return dir.split('/').map(function(part) {
    curr.push(part);
    return '<a href="' + curr.join('/') + '">' + part + '</a>';
  }).join(' / ');
}
function html(files, dir, useIcons) {
  return '<ul id="files">' + files.map(function(file) {
    var icon = '',
        classes = [];
    if (useIcons && '..' != file) {
      icon = icons[extname(file)] || icons.default;
      icon = '<img src="data:image/png;base64,' + load(icon) + '" />';
      classes.push('icon');
    }
    return '<li><a href="' + join(dir, file) + '" class="' + classes.join(' ') + '"' + ' title="' + file + '">' + icon + file + '</a></li>';
  }).join('\n') + '</ul>';
}
function load(icon) {
  if (cache[icon])
    return cache[icon];
  return cache[icon] = fs.readFileSync(__dirname + '/../public/icons/' + icon, 'base64');
}
function removeHidden(files) {
  return files.filter(function(file) {
    return '.' != file[0];
  });
}
var icons = {
  '.js': 'page_white_code_red.png',
  '.c': 'page_white_c.png',
  '.h': 'page_white_h.png',
  '.cc': 'page_white_cplusplus.png',
  '.php': 'page_white_php.png',
  '.rb': 'page_white_ruby.png',
  '.cpp': 'page_white_cplusplus.png',
  '.swf': 'page_white_flash.png',
  '.pdf': 'page_white_acrobat.png',
  'default': 'page_white.png'
};
