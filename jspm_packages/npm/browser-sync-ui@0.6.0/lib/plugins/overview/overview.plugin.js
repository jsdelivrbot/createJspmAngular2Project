/* */ 
const PLUGIN_NAME = "Overview";
module.exports = {
  "plugin": function() {},
  "hooks": {
    "markup": fileContent("/overview.html"),
    "client:js": fileContent("/overview.client.js"),
    "templates": [getPath("/snippet-info.html"), getPath("/url-info.html")],
    "page": {
      path: "/",
      title: PLUGIN_NAME,
      template: "overview.html",
      controller: PLUGIN_NAME.replace(" ", "") + "Controller",
      order: 1,
      icon: "cog"
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
