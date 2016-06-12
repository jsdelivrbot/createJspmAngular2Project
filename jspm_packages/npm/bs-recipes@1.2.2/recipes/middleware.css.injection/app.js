/* */ 
var browserSync = require('browser-sync');
function lessMiddleware(req, res, next) {
  var parsed = require('url').parse(req.url);
  if (parsed.pathname.match(/\.less$/)) {
    return less(parsed.pathname).then(function(o) {
      res.setHeader('Content-Type', 'text/css');
      res.end(o.css);
    });
  }
  next();
}
function less(src) {
  var f = require('fs').readFileSync('app' + src).toString();
  return require('less').render(f);
}
browserSync({
  files: "app/css/*.less",
  server: "app",
  injectFileTypes: ["less"],
  middleware: lessMiddleware
});
