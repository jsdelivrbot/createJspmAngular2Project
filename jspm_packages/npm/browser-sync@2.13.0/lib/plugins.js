/* */ 
(function(process) {
  var Immutable = require('immutable');
  var Map = Immutable.Map;
  var isMap = Immutable.Map.isMap;
  var List = Immutable.List;
  var qs = require('qs');
  var path = require('path');
  var fs = require('fs');
  var Plugin = Immutable.Record({
    moduleName: "",
    name: "",
    active: true,
    module: undefined,
    options: Map({}),
    via: "inline",
    dir: process.cwd(),
    init: undefined,
    errors: List([])
  });
  function resolvePlugin(item) {
    if (typeof item === "string") {
      return getFromString(item);
    }
    if (!isMap(item)) {
      return new Plugin().mergeDeep({errors: [new Error("Plugin not supported in this format")]});
    }
    if (item.has("module")) {
      var nameOrObj = item.get("module");
      var options = item.get("options");
      if (typeof nameOrObj === "string") {
        return getFromString(nameOrObj).mergeDeep({options: options});
      }
      if (Immutable.Map.isMap(nameOrObj)) {
        return new Plugin({
          module: nameOrObj,
          options: options
        });
      }
    }
    if (item.has("plugin")) {
      return new Plugin({module: item});
    }
    return new Plugin().mergeDeep({errors: [new Error("Plugin was not configured correctly")]});
  }
  module.exports.resolvePlugin = resolvePlugin;
  function requirePlugin(item) {
    if (item.get("module") && typeof item.get("module") !== "string") {
      return item;
    }
    try {
      var maybe = path.resolve(process.cwd(), "node_modules", item.get("name"));
      return item.set("module", require(maybe));
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        var maybe = path.resolve(process.cwd(), item.get("name"));
        if (fs.existsSync(maybe)) {
          return item.set("module", require(maybe));
        } else {
          return item.update("errors", function(errors) {
            return errors.concat(e);
          });
        }
      }
      throw e;
    }
  }
  module.exports.requirePlugin = requirePlugin;
  function getFromString(string) {
    var split = string.split("?");
    var outGoing = new Plugin({
      moduleName: split[0],
      name: split[0]
    });
    if (split.length > 1) {
      return outGoing.update("options", function(opts) {
        return opts.mergeDeep(qs.parse(split[1]));
      });
    }
    return outGoing;
  }
})(require('process'));
