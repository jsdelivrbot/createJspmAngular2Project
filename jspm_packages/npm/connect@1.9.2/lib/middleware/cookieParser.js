/* */ 
var utils = require('../utils');
module.exports = function cookieParser() {
  return function cookieParser(req, res, next) {
    var cookie = req.headers.cookie;
    if (req.cookies)
      return next();
    req.cookies = {};
    if (cookie) {
      try {
        req.cookies = utils.parseCookie(cookie);
      } catch (err) {
        return next(err);
      }
    }
    next();
  };
};
