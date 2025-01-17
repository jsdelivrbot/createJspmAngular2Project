/* */ 
(function(process) {
  'use strict';
  var helpText = ['Usage', '  $ window-size', '', 'Example', '  $ window-size', '  height: 40 ', '  width : 145', ''].join('\n');
  function showSize() {
    var size = require('../window-size@0.1.4');
    console.log('height: ' + size.height);
    console.log('width : ' + size.width);
  }
  if (process.argv.length > 2) {
    switch (process.argv[2]) {
      case 'help':
      case '--help':
      case '-h':
        console.log(helpText);
        break;
      default:
        showSize();
    }
  } else {
    showSize();
  }
})(require('process'));
