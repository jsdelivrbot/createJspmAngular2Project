/* */ 
var dumpResponse,
    dumpingHandler,
    enhance,
    utils,
    _;
_ = require('underscore');
utils = require('./utils');
dumpingHandler = function(request, response, uri) {
  var element,
      originalSend,
      _i,
      _len,
      _ref,
      _results;
  originalSend = response.send;
  response.send = function(body) {
    return dumpResponse(originalSend, body, request, response, uri);
  };
  if (request.method !== 'POST') {
    return;
  }
  utils.logVerbose('--------------------------------------------------');
  utils.logVerbose("" + request.method + " " + uri + " [request]");
  if (_.isArray(request.body)) {
    _ref = request.body;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      _results.push(utils.logVerbose("   " + (enhance(JSON.parse(element)))));
    }
    return _results;
  } else {
    return utils.logVerbose("   " + (enhance(request.body)));
  }
};
dumpResponse = function(originalSend, body, request, response, uri) {
  var e,
      element,
      _i,
      _len,
      _ref,
      _results;
  originalSend.call(response, body);
  if ((_ref = request.method) !== 'GET' && _ref !== 'POST') {
    return;
  }
  try {
    body = JSON.parse(body);
  } catch (_error) {
    e = _error;
    return;
  }
  if (_.isArray(body) && (body.length === 0)) {
    return;
  }
  utils.logVerbose('--------------------------------------------------');
  utils.logVerbose("" + request.method + " " + uri + " " + response.statusCode + " [response]");
  if (_.isArray(body)) {
    _results = [];
    for (_i = 0, _len = body.length; _i < _len; _i++) {
      element = body[_i];
      _results.push(utils.logVerbose("   " + (enhance(JSON.parse(element)))));
    }
    return _results;
  } else {
    return utils.logVerbose("   " + (enhance(body)));
  }
};
enhance = function(object) {
  var args,
      signature;
  if (!object["interface"] || !object.method || !object.args) {
    return JSON.stringify(object);
  }
  signature = "" + object["interface"] + "." + object.method;
  args = JSON.stringify(object.args);
  if (args.length > 500) {
    args = "" + (args.substr(0, 50)) + "...";
  }
  return "" + signature + "(" + args + ")";
};
module.exports = dumpingHandler;
