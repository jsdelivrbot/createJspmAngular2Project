/* */ 
"use strict";
var enableDestroy = require('server-destroy');
var _ = require('../../lodash.custom');
module.exports.plugin = function(bs, scripts) {
  var debug = bs.debug;
  var proxy = bs.options.get("proxy");
  var type = bs.options.get("mode");
  var bsServer = createServer(bs, scripts);
  if (type === "server" || type === "snippet") {
    debug("Static Server running ({magenta:%s}) ...", bs.options.get("scheme"));
  }
  if (proxy) {
    debug("Proxy running, proxing: {magenta:%s}", proxy.get("target"));
  }
  if (bsServer) {
    enableDestroy(bsServer.server);
    bsServer.server.listen(bs.options.get("port"));
    bs.registerCleanupTask(function() {
      if (bs.io && bs.io.sockets) {
        setCloseReceived(bs.io.sockets);
      }
      if (bs.ui && bs.ui.socket) {
        setCloseReceived(bs.ui.socket);
      }
    });
    bs.registerCleanupTask(function() {
      bsServer.server.destroy();
    });
  }
  function setCloseReceived(io) {
    Object.keys(io.sockets).forEach(function(key) {
      _.set(io.sockets[key], "conn.transport.socket._closeReceived", true);
    });
  }
  debug("Running mode: %s", type.toUpperCase());
  return {
    server: bsServer.server,
    app: bsServer.app
  };
};
function createServer(bs, clientScripts) {
  var proxy = bs.options.get("proxy");
  var server = bs.options.get("server");
  if (!proxy && !server) {
    return require('./snippet-server')(bs, clientScripts);
  }
  if (proxy) {
    return require('./proxy-server')(bs, clientScripts);
  }
  if (server) {
    return require('./static-server')(bs, clientScripts);
  }
}
module.exports.createServer = createServer;
