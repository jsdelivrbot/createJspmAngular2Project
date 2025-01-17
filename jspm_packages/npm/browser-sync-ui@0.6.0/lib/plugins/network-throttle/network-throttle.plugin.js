/* */ 
var networkThrottle = require('./network-throttle');
const PLUGIN_NAME = "Network Throttle";
module.exports = {
  "plugin": function(ui, bs) {
    ui.throttle = networkThrottle.init(ui, bs);
    ui.listen("network-throttle", ui.throttle);
  },
  "hooks": {
    "markup": fileContent("/network-throttle.html"),
    "client:js": [fileContent("/network-throttle.client.js")],
    "templates": [],
    "page": {
      path: "/network-throttle",
      title: PLUGIN_NAME,
      template: "network-throttle.html",
      controller: "NetworkThrottleController",
      order: 5,
      icon: "time"
    }
  },
  "plugin:name": PLUGIN_NAME
};
function getPath(filepath) {
  return require('path').join(__dirname, filepath);
}
function fileContent(filepath) {
  return require('fs').readFileSync(getPath(filepath));
}
