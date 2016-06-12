/* */ 
(function(process) {
  process.title = 'beep';
  var cursor = require('../../../ansi@0.3.1')(process.stdout);
  function beep() {
    cursor.beep();
    setTimeout(beep, 1000 - (new Date()).getMilliseconds());
  }
  setTimeout(beep, 1000 - (new Date()).getMilliseconds());
})(require('process'));
