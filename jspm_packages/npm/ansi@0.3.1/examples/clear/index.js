/* */ 
(function(process) {
  process.title = 'clear';
  function lf() {
    return '\n';
  }
  require('../../../ansi@0.3.1')(process.stdout).write(Array.apply(null, Array(process.stdout.getWindowSize()[1])).map(lf).join('')).eraseData(2).goto(1, 1);
})(require('process'));
