/* */ 
(function(process) {
  "use strict";
  var _ = require('../lodash.custom');
  var Immutable = require('immutable');
  var utils = require('./utils');
  var pluginUtils = require('./plugins');
  var connectUtils = require('./connect-utils');
  module.exports = {
    getEmptyPort: function(bs, done) {
      utils.getPorts(bs.options, function(err, port) {
        if (err) {
          return utils.fail(true, err, bs.cb);
        }
        bs.debug("Found a free port: {magenta:%s", port);
        done(null, {options: {port: port}});
      });
    },
    getExtraPortForProxy: function(bs, done) {
      if (bs.options.get("mode") !== "proxy") {
        return done();
      }
      if (!bs.options.getIn(["proxy", "ws"])) {
        return done();
      }
      var socketPort = bs.options.get("port") + 1;
      if (bs.options.hasIn(["socket", "port"])) {
        socketPort = bs.options.getIn(["socket", "port"]);
      }
      utils.getPort(socketPort, null, function(err, port) {
        if (err) {
          return utils.fail(true, err, bs.cb);
        }
        done(null, {optionsIn: [{
            path: ["socket", "port"],
            value: port
          }]});
      });
    },
    getOnlineStatus: function(bs, done) {
      if (_.isUndefined(bs.options.get("online")) && _.isUndefined(process.env.TESTING)) {
        require('dns').resolve("www.google.com", function(err) {
          var online = false;
          if (err) {
            bs.debug("Could not resolve www.google.com, setting {magenta:online: false}");
          } else {
            bs.debug("Resolved www.google.com, setting {magenta:online: true}");
            online = true;
          }
          done(null, {options: {online: online}});
        });
      } else {
        done();
      }
    },
    resolveInlineUserPlugins: function(bs, done) {
      var plugins = bs.options.get("plugins").map(pluginUtils.resolvePlugin).map(pluginUtils.requirePlugin);
      plugins.forEach(function(plugin) {
        if (plugin.get("errors").size) {
          return logPluginError(plugin);
        }
        var jsPlugin = plugin.toJS();
        jsPlugin.options = jsPlugin.options || {};
        jsPlugin.options.moduleName = jsPlugin.moduleName;
        bs.registerPlugin(jsPlugin.module, jsPlugin.options);
      });
      function logPluginError(plugin) {
        utils.fail(true, plugin.getIn(["errors", 0]), bs.cb);
      }
      done();
    },
    setOptions: function(bs, done) {
      done(null, {options: {
          urls: utils.getUrlOptions(bs.options),
          snippet: connectUtils.scriptTags(bs.options),
          scriptPaths: Immutable.fromJS(connectUtils.clientScript(bs.options, true)),
          files: bs.pluginManager.hook("files:watch", bs.options.get("files"), bs.pluginManager.pluginOptions)
        }});
    },
    setInternalEvents: function(bs, done) {
      require('./internal-events')(bs);
      done();
    },
    setFileWatchers: function(bs, done) {
      done(null, {instance: {watchers: bs.pluginManager.get("file:watcher")(bs)}});
    },
    mergeMiddlewares: function(bs, done) {
      done(null, {options: {middleware: bs.pluginManager.hook("server:middleware", bs.options.get("middleware"))}});
    },
    setUserRewriteRules: function(bs, done) {
      var userRules = bs.options.get("rewriteRules");
      done(null, {instance: {rewriteRules: userRules ? userRules.toJS() : []}});
    },
    setRewriteRules: function(bs, done) {
      var snippetUtils = require('./snippet').utils;
      done(null, {instance: {snippetMw: snippetUtils.getSnippetMiddleware(bs.options.get("snippet"), bs.options.get("snippetOptions"), bs.rewriteRules)}});
    },
    startServer: function(bs, done) {
      var clientJs = bs.pluginManager.hook("client:js", {
        port: bs.options.get("port"),
        options: bs.options
      });
      var server = bs.pluginManager.get("server")(bs, bs.pluginManager.get("client:script")(bs.options.toJS(), clientJs, "middleware"));
      done(null, {instance: {
          clientJs: clientJs,
          server: server.server,
          app: server.app
        }});
    },
    addServeStaticMiddleware: function(bs, done) {
      bs.options.get("serveStatic").forEach(function(dir) {
        bs.addMiddleware("*", utils.serveStatic(dir));
      });
      done();
    },
    startTunnel: function(bs, done) {
      if (bs.options.get("tunnel") && bs.options.get("online")) {
        var localTunnel = require('./tunnel');
        localTunnel(bs, function(err, tunnel) {
          if (err) {
            return done(err);
          } else {
            return done(null, {
              optionsIn: [{
                path: ["urls", "tunnel"],
                value: tunnel.url
              }],
              instance: {tunnel: tunnel}
            });
          }
        });
      } else {
        done();
      }
    },
    startSockets: function(bs, done) {
      var clientEvents = bs.pluginManager.hook("client:events", bs.options.get("clientEvents").toJS());
      var io = bs.pluginManager.get("socket")(bs.server, clientEvents, bs);
      done(null, {
        instance: {io: io},
        options: {clientEvents: Immutable.fromJS(clientEvents)}
      });
    },
    addHttpProtocol: function(bs, done) {
      bs.addMiddleware(require('./config').httpProtocol.path, require('./http-protocol').middleware(bs), {
        override: true,
        id: "Browsersync HTTP Protocol"
      });
      done();
    },
    startUi: function(bs, done) {
      var PLUGIN_NAME = "UI";
      var userPlugins = bs.getUserPlugins();
      var ui = bs.pluginManager.get(PLUGIN_NAME);
      var uiOpts = bs.options.get("ui");
      if (!uiOpts || uiOpts.get("enabled") === false) {
        return done();
      }
      if (userPlugins.some(function(item) {
        return item.name === PLUGIN_NAME;
      })) {
        uiOpts = bs.options.get("ui").mergeDeep(Immutable.fromJS(bs.pluginManager.pluginOptions[PLUGIN_NAME]));
      }
      return ui(uiOpts.toJS(), bs, function(err, ui) {
        if (err) {
          return done(err);
        }
        done(null, {instance: {ui: ui}});
      });
    },
    mergeUiSettings: function(bs, done) {
      if (!bs.ui) {
        return done();
      }
      done(null, {options: {urls: bs.options.get("urls").merge(bs.ui.options.get("urls"))}});
    },
    initUserPlugins: function(bs, done) {
      bs.pluginManager.initUserPlugins(bs);
      done(null, {options: {userPlugins: bs.getUserPlugins()}});
    }
  };
})(require('process'));
