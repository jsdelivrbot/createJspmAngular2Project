/* */ 
var ExtensionManager,
    utils;
utils = require('./utils');
utils.registerClass(ExtensionManager = (function() {
  function ExtensionManager() {
    this.extensions = [];
  }
  return ExtensionManager;
})());
module.exports = new ExtensionManager;
