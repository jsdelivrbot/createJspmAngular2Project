/* */ 
var url = require('url');
var EventEmitter = require('events').EventEmitter;
var request = require('request');
var debug = require('debug')('localtunnel:client');
var TunnelCluster = require('./TunnelCluster');
var Tunnel = function(opt) {
  if (!(this instanceof Tunnel)) {
    return new Tunnel(opt);
  }
  var self = this;
  self._closed = false;
  self._opt = opt || {};
  self._opt.host = self._opt.host || 'https://localtunnel.me';
};
Tunnel.prototype.__proto__ = EventEmitter.prototype;
Tunnel.prototype._init = function(cb) {
  var self = this;
  var opt = self._opt;
  var params = {
    path: '/',
    json: true
  };
  var base_uri = opt.host + '/';
  var upstream = url.parse(opt.host);
  var assigned_domain = opt.subdomain;
  params.uri = base_uri + ((assigned_domain) ? assigned_domain : '?new');
  (function get_url() {
    request(params, function(err, res, body) {
      if (err) {
        console.log('tunnel server offline: ' + err.message + ', retry 1s');
        return setTimeout(get_url, 1000);
      }
      if (res.statusCode !== 200) {
        var err = new Error((body && body.message) || 'localtunnel server returned an error, please try again');
        return cb(err);
      }
      var port = body.port;
      var host = upstream.hostname;
      var max_conn = body.max_conn_count || 1;
      cb(null, {
        remote_host: upstream.hostname,
        remote_port: body.port,
        name: body.id,
        url: body.url,
        max_conn: max_conn
      });
    });
  })();
};
Tunnel.prototype._establish = function(info) {
  var self = this;
  var opt = self._opt;
  self.setMaxListeners(info.max_conn + (EventEmitter.defaultMaxListeners || 10));
  info.local_host = opt.local_host;
  info.local_port = opt.port;
  var tunnels = self.tunnel_cluster = TunnelCluster(info);
  tunnels.once('open', function() {
    self.emit('url', info.url);
  });
  tunnels.on('error', function(err) {
    self.emit('error', err);
  });
  var tunnel_count = 0;
  tunnels.on('open', function(tunnel) {
    tunnel_count++;
    debug('tunnel open [total: %d]', tunnel_count);
    var close_handler = function() {
      tunnel.destroy();
    };
    if (self._closed) {
      return close_handler();
    }
    self.once('close', close_handler);
    tunnel.once('close', function() {
      self.removeListener('close', close_handler);
    });
  });
  tunnels.on('dead', function(tunnel) {
    tunnel_count--;
    debug('tunnel dead [total: %d]', tunnel_count);
    if (self._closed) {
      return;
    }
    tunnels.open();
  });
  for (var count = 0; count < info.max_conn; ++count) {
    tunnels.open();
  }
};
Tunnel.prototype.open = function(cb) {
  var self = this;
  self._init(function(err, info) {
    if (err) {
      return cb(err);
    }
    self.url = info.url;
    self._establish(info);
    cb();
  });
};
Tunnel.prototype.close = function() {
  var self = this;
  self._closed = true;
  self.emit('close');
};
module.exports = Tunnel;
