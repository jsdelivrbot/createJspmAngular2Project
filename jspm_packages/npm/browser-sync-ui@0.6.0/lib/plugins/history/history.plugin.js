/* */ 
var historyPlugin = require('./history');
const PLUGIN_NAME = "History";
module.exports = {
  "plugin": function(ui, bs) {
    ui.history = historyPlugin.init(ui, bs);
  },
  "hooks": {
    "markup": fileContent("history.html"),
    "client:js": fileContent("/history.client.js"),
    "templates": [getPath("/history.directive.html")],
    "page": {
      path: "/history",
      title: PLUGIN_NAME,
      template: "history.html",
      controller: PLUGIN_NAME + "Controller",
      order: 3,
      icon: "list2"
    }
  },
  "plugin:name": PLUGIN_NAME
};
function getPath(filepath) {
  return require('path').join(__dirname, filepath);
}
function fileContent(filepath) {
  return require('fs').readFileSync(getPath(filepath), "utf-8");
}
