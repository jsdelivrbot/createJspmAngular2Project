/* */ 
var utils = require('../utils'),
    crypto = require('crypto');
module.exports = function csrf(options) {
  var options = options || {},
      value = options.value || defaultValue;
  return function(req, res, next) {
    var token = req.session._csrf || (req.session._csrf = utils.uid(24));
    if ('GET' == req.method || 'HEAD' == req.method || 'OPTIONS' == req.method)
      return next();
    var val = value(req);
    if (val != token)
      return utils.forbidden(res);
    next();
  };
};
function defaultValue(req) {
  return (req.body && req.body._csrf) || (req.query && req.query._csrf) || (req.headers['x-csrf-token']);
}
