/* */ 
var qs = require('qs'),
    parse = require('url').parse;
module.exports = function query() {
  return function query(req, res, next) {
    req.query = ~req.url.indexOf('?') ? qs.parse(parse(req.url).query) : {};
    next();
  };
};
