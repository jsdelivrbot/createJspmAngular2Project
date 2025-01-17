/* */ 
var ServiceManager,
    Services,
    fs,
    getMethodProxy,
    getServiceInterface,
    path,
    utils,
    _,
    __slice = [].slice;
path = require('path');
fs = require('fs');
_ = require('underscore');
utils = require('./utils');
Services = {};
utils.registerClass(ServiceManager = (function() {
  function ServiceManager() {
    this.services = {};
  }
  ServiceManager.prototype.get = function(name) {
    if (_.has(this.services, name)) {
      return this.services[name];
    }
    return null;
  };
  ServiceManager.prototype.registerLocalClass = function(name) {
    var e,
        serviceClass;
    serviceClass = null;
    try {
      serviceClass = require("./service/" + name);
    } catch (_error) {
      e = _error;
      utils.log("local service class not found: " + name);
      throw e;
    }
    return this.services[name] = new serviceClass;
  };
  ServiceManager.prototype.registerProxyClass = function(name) {
    var intf,
        method,
        service,
        _i,
        _len,
        _ref;
    intf = getServiceInterface(name);
    if (!intf) {
      utils.exit("proxy service class not found: " + name);
    }
    if (intf.name !== name) {
      utils.exit("proxy interface '" + intf.name + "' loaded when '" + name + "' requested");
    }
    service = {};
    _ref = intf.methods;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      service[method.name] = getMethodProxy(name, method.name);
    }
    return this.services[name] = service;
  };
  return ServiceManager;
})());
getMethodProxy = function(intfName, methodName) {
  return function() {
    var args,
        channel,
        channels,
        _i,
        _len,
        _results;
    channels = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (!_.isArray(channels)) {
      channels = [channels];
    }
    _results = [];
    for (_i = 0, _len = channels.length; _i < _len; _i++) {
      channel = channels[_i];
      _results.push(channel.sendMessage.apply(channel, [intfName, methodName].concat(__slice.call(args))));
    }
    return _results;
  };
};
getServiceInterface = function(name) {
  var contents,
      fileName,
      jsonName,
      serviceInterface;
  jsonName = "" + name + ".json";
  fileName = path.join(utils.options.staticWebDir, 'interfaces', jsonName);
  if (!utils.fileExistsSync(fileName)) {
    return null;
  }
  contents = fs.readFileSync(fileName, 'utf8');
  serviceInterface = JSON.parse(contents);
  return serviceInterface.interfaces[0];
};
module.exports = new ServiceManager;
