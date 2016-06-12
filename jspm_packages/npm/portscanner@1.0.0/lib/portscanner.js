/* */ 
var net = require('net'),
    Socket = net.Socket,
    async = require('async');
var portscanner = exports;
portscanner.findAPortInUse = function(startPort, endPort, host, callback) {
  findAPortWithStatus('open', startPort, endPort, host, callback);
};
portscanner.findAPortNotInUse = function(startPort, endPort, host, callback) {
  findAPortWithStatus('closed', startPort, endPort, host, callback);
};
portscanner.checkPortStatus = function(port, options, callback) {
  if (typeof options === 'string') {
    options = {host: options};
  }
  var host = options.host || '127.0.0.1';
  var timeout = options.timeout || 400;
  var connectionRefused = false;
  var socket = new Socket(),
      status = null,
      error = null;
  socket.on('connect', function() {
    status = 'open';
    socket.destroy();
  });
  socket.setTimeout(timeout);
  socket.on('timeout', function() {
    status = 'closed';
    error = new Error('Timeout (' + timeout + 'ms) occurred waiting for ' + host + ':' + port + ' to be available');
    socket.destroy();
  });
  socket.on('error', function(exception) {
    if (exception.code !== "ECONNREFUSED") {
      error = exception;
    } else
      connectionRefused = true;
    status = 'closed';
  });
  socket.on('close', function(exception) {
    if (exception && !connectionRefused)
      error = exception;
    else
      error = null;
    callback(error, status);
  });
  socket.connect(port, host);
};
function findAPortWithStatus(status, startPort, endPort, host, callback) {
  endPort = endPort || 65535;
  var foundPort = false;
  var numberOfPortsChecked = 0;
  var port = startPort;
  var hasFoundPort = function() {
    return foundPort || numberOfPortsChecked === (endPort - startPort + 1);
  };
  var checkNextPort = function(callback) {
    portscanner.checkPortStatus(port, host, function(error, statusOfPort) {
      numberOfPortsChecked++;
      if (statusOfPort === status) {
        foundPort = true;
        callback(error);
      } else {
        port++;
        callback(null);
      }
    });
  };
  async.until(hasFoundPort, checkNextPort, function(error) {
    if (error) {
      callback(error, port);
    } else if (foundPort) {
      callback(null, port);
    } else {
      callback(null, false);
    }
  });
}
