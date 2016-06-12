/* */ 
var connections = require('./lib/connections');
const PLUGIN_NAME = "Connections";
module.exports = {
  "plugin": function(ui, bs) {
    connections.init(ui, bs);
  },
  "hooks": {
    "client:js": fileContent("/connections.client.js"),
    "templates": [getPath("/connections.directive.html")]
  },
  "plugin:name": PLUGIN_NAME
};
function getPath(filepath) {
  return require('path').join(__dirname, filepath);
}
function fileContent(filepath) {
  return require('fs').readFileSync(getPath(filepath), "utf-8");
}
