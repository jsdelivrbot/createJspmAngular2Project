/* */ 
const PLUGIN_NAME = "Plugins";
module.exports = {
  "plugin": function(ui, bs) {
    ui.listen("plugins", {
      "set": function(data) {
        bs.events.emit("plugins:configure", data);
      },
      "setMany": function(data) {
        if (data.value !== true) {
          data.value = false;
        }
        bs.getUserPlugins().filter(function(item) {
          return item.name !== "UI    ";
        }).forEach(function(item) {
          item.active = data.value;
          bs.events.emit("plugins:configure", item);
        });
      }
    });
  },
  "hooks": {
    "markup": fileContent("plugins.html"),
    "client:js": fileContent("/plugins.client.js"),
    "templates": [],
    "page": {
      path: "/plugins",
      title: PLUGIN_NAME,
      template: "plugins.html",
      controller: PLUGIN_NAME + "Controller",
      order: 4,
      icon: "plug"
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
