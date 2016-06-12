/* */ 
var url = require('url');
var Immutable = require('immutable');
module.exports.init = function(ui, bs) {
  var validUrls = Immutable.OrderedSet();
  var methods = {
    sendUpdatedUrls: function(urls) {
      ui.socket.emit("ui:history:update", decorateUrls(urls));
    },
    sendUpdatedIfChanged: function(current, temp) {
      if (!Immutable.is(current, temp)) {
        validUrls = temp;
        methods.sendUpdatedUrls(validUrls);
      }
    },
    sendToUrl: function(data) {
      var parsed = url.parse(data.path);
      data.override = true;
      data.path = parsed.path;
      data.url = parsed.href;
      ui.clients.emit("browser:location", data);
    },
    addPath: function(data) {
      var temp = addPath(validUrls, url.parse(data.href), bs.options.get("mode"));
      methods.sendUpdatedIfChanged(validUrls, temp, ui.socket);
    },
    removePath: function(data) {
      var temp = removePath(validUrls, data.path);
      methods.sendUpdatedIfChanged(validUrls, temp, ui.socket);
    },
    getVisited: function() {
      ui.socket.emit("ui:receive:visited", decorateUrls(validUrls));
    }
  };
  ui.clients.on("connection", function(client) {
    client.on("ui:history:connected", methods.addPath);
  });
  ui.socket.on("connection", function(uiClient) {
    uiClient.on("ui:get:visited", methods.getVisited);
    methods.sendUpdatedUrls(validUrls);
  });
  ui.listen("history", {
    "sendAllTo": methods.sendToUrl,
    "remove": methods.removePath,
    "clear": function() {
      validUrls = Immutable.OrderedSet([]);
      methods.sendUpdatedUrls(validUrls);
    }
  });
  return methods;
};
function decorateUrls(urls) {
  var count = 0;
  return urls.map(function(value) {
    count += 1;
    return {
      path: value,
      key: count
    };
  }).toJS().reverse();
}
function addPath(immSet, urlObj, mode) {
  return immSet.add(mode === "snippet" ? urlObj.href : urlObj.path);
}
module.exports.addPath = addPath;
function removePath(immSet, urlPath) {
  return immSet.remove(url.parse(urlPath).path);
}
module.exports.removePath = removePath;
