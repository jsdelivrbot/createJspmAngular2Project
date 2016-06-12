/* */ 
(function(Buffer) {
  var utils = require('../utils'),
      unauthorized = utils.unauthorized,
      badRequest = utils.badRequest;
  module.exports = function basicAuth(callback, realm) {
    var username,
        password;
    if ('string' == typeof callback) {
      username = callback;
      password = realm;
      if ('string' != typeof password)
        throw new Error('password argument required');
      realm = arguments[2];
      callback = function(user, pass) {
        return user == username && pass == password;
      };
    }
    realm = realm || 'Authorization Required';
    return function(req, res, next) {
      var authorization = req.headers.authorization;
      if (req.remoteUser)
        return next();
      if (!authorization)
        return unauthorized(res, realm);
      var parts = authorization.split(' '),
          scheme = parts[0],
          credentials = new Buffer(parts[1], 'base64').toString().split(':');
      if ('Basic' != scheme)
        return badRequest(res);
      if (callback.length >= 3) {
        var pause = utils.pause(req);
        callback(credentials[0], credentials[1], function(err, user) {
          if (err || !user)
            return unauthorized(res, realm);
          req.remoteUser = user;
          next();
          pause.resume();
        });
      } else {
        if (callback(credentials[0], credentials[1])) {
          req.remoteUser = credentials[0];
          next();
        } else {
          unauthorized(res, realm);
        }
      }
    };
  };
})(require('buffer').Buffer);
