/* */ 
const PLUGIN_NAME = "Help / About";
module.exports = {
  "plugin": function() {},
  "hooks": {
    "markup": fileContent("/../../../static/content/help.content.html"),
    "client:js": fileContent("/help.client.js"),
    "templates": [getPath("/help.directive.html")],
    "page": {
      path: "/help",
      title: PLUGIN_NAME,
      template: "help.html",
      controller: "HelpAboutController",
      order: 6,
      icon: "help"
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
