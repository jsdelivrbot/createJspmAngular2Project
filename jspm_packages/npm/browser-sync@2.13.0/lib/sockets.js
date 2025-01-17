/* */ 
"use strict";
var socket = require('socket.io');
var utils = require('./server/utils');
var Steward = require('emitter-steward');
module.exports.plugin = function(server, clientEvents, bs) {
  return exports.init(server, clientEvents, bs);
};
module.exports.init = function(server, clientEvents, bs) {
  var emitter = bs.events;
  var socketConfig = bs.options.get("socket").toJS();
  if (bs.options.get("mode") === "proxy" && bs.options.getIn(["proxy", "ws"])) {
    server = utils.getServer(null, bs.options).server;
    server.listen(bs.options.getIn(["socket", "port"]));
    bs.registerCleanupTask(function() {
      server.close();
    });
  }
  var socketIoConfig = socketConfig.socketIoOptions;
  socketIoConfig.path = socketConfig.path;
  var io = socket(server, socketIoConfig);
  io.sockets = io.of(socketConfig.namespace);
  io.set("heartbeat interval", socketConfig.clients.heartbeatTimeout);
  var steward = new Steward(emitter);
  bs.registerCleanupTask(steward.destroy.bind(steward));
  io.sockets.on("connection", handleConnection);
  function handleConnection(client) {
    if (bs.options.get("ghostMode")) {
      addGhostMode(client);
    }
    client.emit("connection", bs.options.toJS());
    emitter.emit("client:connected", {ua: client.handshake.headers["user-agent"]});
  }
  function handleClientEvent(event, client, data) {
    if (steward.valid(client.id)) {
      client.broadcast.emit(event, data);
    }
  }
  function addGhostMode(client) {
    clientEvents.forEach(addEvent);
    function addEvent(event) {
      client.on(event, handleClientEvent.bind(null, event, client));
    }
  }
  return io;
};
