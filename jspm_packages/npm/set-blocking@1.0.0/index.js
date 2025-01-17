/* */ 
(function(process) {
  module.exports = function(blocking) {
    [process.stdout, process.stderr].forEach(function(stream) {
      if (stream._handle && typeof stream._handle.setBlocking === 'function') {
        stream._handle.setBlocking(blocking);
      }
    });
  };
})(require('process'));
