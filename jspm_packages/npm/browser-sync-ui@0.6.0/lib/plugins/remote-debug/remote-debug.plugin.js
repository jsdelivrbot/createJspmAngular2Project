/* */ 
var weinre = require('./weinre');
var overlayPlugin = require('./overlay-grid/overlay-grid');
var clientFiles = require('./client-files');
const PLUGIN_NAME = "Remote Debug";
module.exports = {
  "plugin": function(ui, bs) {
    if (bs.options.get("scheme") === "https") {
      ui.setMany(function(item) {
        item.deleteIn(["clientFiles", "weinre"]);
      });
    } else {
      ui.weinre = weinre.init(ui);
    }
    ui.overlayGrid = overlayPlugin.init(ui, bs);
    ui.listen("remote-debug:files", {
      "enableFile": function(file) {
        ui.enableElement(file);
      },
      "disableFile": function(file) {
        ui.disableElement(file);
      }
    });
    ui.listen("remote-debug:weinre", ui.weinre);
    ui.listen("remote-debug:overlay-grid", ui.overlayGrid);
  },
  "hooks": {
    "markup": fileContent("remote-debug.html"),
    "client:js": [fileContent("/remote-debug.client.js"), fileContent("/overlay-grid/overlay-grid.client.js")],
    "templates": [getPath("/overlay-grid/overlay-grid.html")],
    "page": {
      path: "/remote-debug",
      title: PLUGIN_NAME,
      template: "remote-debug.html",
      controller: PLUGIN_NAME.replace(" ", "") + "Controller",
      order: 4,
      icon: "bug"
    },
    elements: clientFiles.files
  },
  "plugin:name": PLUGIN_NAME
};
function getPath(filepath) {
  return require('path').join(__dirname, filepath);
}
function fileContent(filepath) {
  return require('fs').readFileSync(getPath(filepath), "utf-8");
}
