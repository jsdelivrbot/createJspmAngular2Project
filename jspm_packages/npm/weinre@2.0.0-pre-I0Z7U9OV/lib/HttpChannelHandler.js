/* */ 
var Channel,
    HttpChannelHandler,
    channelManager,
    handleCreate,
    handleError,
    handleGet,
    handleOptions,
    handlePost,
    setCORSHeaders,
    setCacheHeaders,
    utils,
    _;
_ = require('underscore');
utils = require('./utils');
Channel = require('./Channel');
channelManager = require('./channelManager');
module.exports = utils.registerClass(HttpChannelHandler = (function() {
  function HttpChannelHandler(pathPrefix) {
    this.pathPrefix = pathPrefix;
    if (this.pathPrefix === '/ws/client') {
      this.isClient = true;
    } else if (this.pathPrefix === '/ws/target') {
      this.isClient = false;
    } else {
      utils.pitch("invalid pathPrefix: " + this.pathPrefix);
    }
    this.isTarget = !this.isClient;
  }
  HttpChannelHandler.prototype.handle = function(request, response, uri) {
    var channelName,
        parts;
    setCORSHeaders(request, response);
    setCacheHeaders(request, response);
    if (uri[0] !== '/') {
      return handleError(request, response, 404);
    }
    if (uri === '/') {
      if (request.method === 'OPTIONS') {
        return handleOptions(request, response);
      }
      if (request.method === 'POST') {
        return handleCreate(this.pathPrefix, this.isClient, request, response);
      }
      return handleError(request, response, 405);
    }
    parts = uri.split('/');
    if (parts.length > 2) {
      return handleError(request, response, 404);
    }
    channelName = parts[1];
    if (request.method === 'OPTIONS') {
      return handleOptions(request, response);
    }
    if (request.method === 'GET') {
      return handleGet(request, response, channelName);
    }
    if (request.method === 'POST') {
      return handlePost(request, response, channelName);
    }
    return handleError(request, response, 405);
  };
  return HttpChannelHandler;
})());
handleCreate = function(pathPrefix, isClient, request, response) {
  var channel,
      id,
      remoteAddress,
      _ref,
      _ref1;
  id = (_ref = request.body) != null ? _ref.id : void 0;
  remoteAddress = ((_ref1 = request.connection) != null ? _ref1.remoteAddress : void 0) || "";
  channel = new Channel(pathPrefix, id, remoteAddress, isClient);
  response.contentType('application/json');
  return response.send(JSON.stringify({
    channel: channel.name,
    id: channel.id
  }));
};
handleGet = function(request, response, channelName) {
  var channel,
      remoteAddress,
      _ref;
  remoteAddress = ((_ref = request.connection) != null ? _ref.remoteAddress : void 0) || "";
  channel = channelManager.getChannel(channelName, remoteAddress);
  if (!channel) {
    return handleError(request, response, 404);
  }
  return channel.getMessages((function(_this) {
    return function(messages) {
      if (channel.isClosed) {
        return handleError(request, response, 404);
      }
      if (!messages) {
        return handleError(request, response, 404);
      }
      response.contentType('application/json');
      return response.send(JSON.stringify(messages));
    };
  })(this));
};
handlePost = function(request, response, channelName) {
  var channel,
      remoteAddress,
      _ref;
  remoteAddress = ((_ref = request.connection) != null ? _ref.remoteAddress : void 0) || "";
  channel = channelManager.getChannel(channelName, remoteAddress);
  if (!channel) {
    return handleError(request, response, 404);
  }
  channel.handleMessages(request.body);
  return response.send('');
};
handleOptions = function(request, response) {
  return response.send('');
};
handleError = function(request, response, status) {
  return response.send(status);
};
setCORSHeaders = function(request, response) {
  var origin;
  origin = request.header('Origin');
  if (!origin) {
    return;
  }
  response.header('Access-Control-Allow-Origin', origin);
  response.header('Access-Control-Max-Age', '600');
  return response.header('Access-Control-Allow-Methods', 'GET, POST');
};
setCacheHeaders = function(request, response) {
  response.header('Pragma', 'no-cache');
  response.header('Expires', '0');
  response.header('Cache-Control', 'no-cache');
  return response.header('Cache-Control', 'no-store');
};
