/* */ 
;modjewel.define("weinre/target/HookSites", function(require, exports, module) { // Generated by CoffeeScript 1.8.0
var HookLib, HookSites;

HookLib = require('../common/HookLib');

module.exports = HookSites = (function() {
  function HookSites() {}

  return HookSites;

})();

HookSites.window_clearInterval = HookLib.addHookSite(window, "clearInterval");

HookSites.window_clearTimeout = HookLib.addHookSite(window, "clearTimeout");

HookSites.window_setInterval = HookLib.addHookSite(window, "setInterval");

HookSites.window_setTimeout = HookLib.addHookSite(window, "setTimeout");

HookSites.window_addEventListener = HookLib.addHookSite(window, "addEventListener");

HookSites.Node_addEventListener = HookLib.addHookSite(Node.prototype, "addEventListener");

HookSites.XMLHttpRequest_open = HookLib.addHookSite(XMLHttpRequest.prototype, "open");

HookSites.XMLHttpRequest_send = HookLib.addHookSite(XMLHttpRequest.prototype, "send");

HookSites.XMLHttpRequest_addEventListener = HookLib.addHookSite(XMLHttpRequest.prototype, "addEventListener");

if (window.openDatabase) {
  HookSites.window_openDatabase = HookLib.addHookSite(window, "openDatabase");
}

if (window.localStorage) {
  HookSites.LocalStorage_setItem = HookLib.addHookSite(window.localStorage, "setItem");
  HookSites.LocalStorage_removeItem = HookLib.addHookSite(window.localStorage, "removeItem");
  HookSites.LocalStorage_clear = HookLib.addHookSite(window.localStorage, "clear");
}

if (window.sessionStorage) {
  HookSites.SessionStorage_setItem = HookLib.addHookSite(window.sessionStorage, "setItem");
  HookSites.SessionStorage_removeItem = HookLib.addHookSite(window.sessionStorage, "removeItem");
  HookSites.SessionStorage_clear = HookLib.addHookSite(window.sessionStorage, "clear");
}

require("../common/MethodNamer").setNamesForClass(module.exports);

});
