/* */ 
var fs = require('fs');
var path = require('path');
var pluginTmpl = templateFile("/plugin.tmpl");
var configTmpl = templateFile("/config.tmpl");
var configItem = templateFile("/config.item.tmpl");
var inlineTemp = templateFile("/inline.template.tmpl");
var pluginItemTmpl = fs.readFileSync(path.resolve(__dirname, "../", "templates/plugin.item.tmpl"), "utf-8");
function templateFile(filepath) {
  return fs.readFileSync(path.join(__dirname, "/../templates", filepath || ""), "utf-8");
}
module.exports = {
  "page": function(hooks, ui) {
    var config = hooks.map(transformConfig).reduce(createConfigItem, {});
    return {
      pagesConfig: configTmpl.replace("%when%", hooks.reduce(createAngularRoutes, "")).replace("%pages%", JSON.stringify(config, null, 4)),
      pagesObj: config,
      pageMarkup: function() {
        return preAngular(ui.pluginManager.plugins, config, ui);
      }
    };
  },
  "markup": function(hooks) {
    return hooks.reduce(pluginTemplate, "");
  },
  "client:js": function(hooks, ui) {
    ui.bsPlugins.forEach(function(plugin) {
      if (plugin.has("client:js")) {
        plugin.get("client:js").forEach(function(value) {
          hooks.push(value);
        });
      }
    });
    var out = hooks.reduce(function(all, item) {
      if (typeof item === "string") {
        all += ";" + item;
      } else if (Array.isArray(item)) {
        item.forEach(function(item) {
          all += ";" + item;
        });
      }
      return all;
    }, "");
    return out;
  },
  "templates": function(hooks, initial, ui) {
    var pluginDirectives = ui.bsPlugins.reduce(function(all, plugin) {
      if (!plugin.has("templates")) {
        return all;
      }
      var slug = plugin.get("name").trim().split(" ").map(function(word) {
        return word.trim().toLowerCase();
      }).join("-");
      plugin.get("templates").forEach(function(value, key) {
        all += angularWrap([slug, path.basename(key)].join("/"), value);
      });
      return all;
    }, "");
    return [pluginDirectives, createInlineTemplates(hooks.concat([initial]))].join("");
  },
  "elements": function(hooks) {
    var obj = {};
    hooks.forEach(function(elements) {
      elements.forEach(function(item) {
        if (!obj[item.name]) {
          obj[item.name] = item;
        }
      });
    });
    return obj;
  }
};
function createInlineTemplates(hooks) {
  return hooks.reduce(function(combined, item) {
    return combined + item.reduce(function(all, filepath) {
      return all + angularWrap(path.basename(filepath), fs.readFileSync(filepath));
    }, "");
  }, "");
}
function transformConfig(item) {
  return item;
}
function createAngularRoutes(all, item) {
  return all + configItem.replace(/%(.+)%/g, function() {
    var key = arguments[1];
    if (item[key]) {
      return item[key];
    }
  });
}
function createConfigItem(joined, item) {
  if (item.path === "/") {
    joined["overview"] = item;
  } else {
    joined[item.path.slice(1)] = item;
  }
  return joined;
}
function pluginTemplate(combined, item) {
  return [combined, pluginTmpl.replace("%markup%", item)].join("\n");
}
function preAngular(plugins, config, ui) {
  return Object.keys(plugins).filter(function(key) {
    return config[key];
  }).map(function(key) {
    if (key === "plugins") {
      var pluginMarkup = ui.bsPlugins.reduce(function(all, item, i) {
        all += pluginItemTmpl.replace("%content%", item.get("markup") || "").replace(/%index%/g, i).replace(/%name%/g, item.get("name"));
        return all;
      }, "");
      plugins[key].hooks.markup = plugins[key].hooks.markup.replace("%pluginlist%", pluginMarkup);
    }
    return angularWrap(config[key].template, bindOnce(plugins[key].hooks.markup, config[key]));
  }).reduce(function(combined, item) {
    return combined + item;
  }, "");
}
function angularWrap(templateName, markup) {
  return inlineTemp.replace("%content%", markup).replace("%id%", templateName);
}
function bindOnce(markup, config) {
  return markup.toString().replace(/\{\{ctrl.section\.(.+?)\}\}/g, function($1, $2) {
    return config[$2] || "";
  });
}
module.exports.bindOnce = bindOnce;
