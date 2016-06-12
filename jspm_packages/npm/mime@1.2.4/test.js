/* */ 
(function(process) {
  var mime = require('./mime');
  exports["test mime lookup"] = function(test) {
    test.equal('text/plain', mime.lookup('text.txt'));
    test.equal('text/plain', mime.lookup('.text.txt'));
    test.equal('text/plain', mime.lookup('.txt'));
    test.equal('text/plain', mime.lookup('txt'));
    test.equal('application/octet-stream', mime.lookup('text.nope'));
    test.equal('fallback', mime.lookup('text.fallback', 'fallback'));
    test.finish();
  };
  exports["test extension lookup"] = function(test) {
    test.equal('txt', mime.extension(mime.types.text));
    test.equal('html', mime.extension(mime.types.htm));
    test.equal('bin', mime.extension('application/octet-stream'));
    test.finish();
  };
  exports["test mime lookup uppercase"] = function(test) {
    test.equal('text/plain', mime.lookup('TEXT.TXT'));
    test.equal('text/plain', mime.lookup('.TXT'));
    test.equal('text/plain', mime.lookup('TXT'));
    test.equal('application/octet-stream', mime.lookup('TEXT.NOPE'));
    test.equal('fallback', mime.lookup('TEXT.FALLBACK', 'fallback'));
    test.finish();
  };
  exports["test custom types"] = function(test) {
    test.equal('application/octet-stream', mime.lookup('file.buffer'));
    test.equal('audio/mp4', mime.lookup('file.m4a'));
    test.finish();
  };
  exports["test charset lookup"] = function(test) {
    test.equal('UTF-8', mime.charsets.lookup('text/plain'));
    test.ok(typeof mime.charsets.lookup(mime.types.js) == 'undefined');
    test.equal('fallback', mime.charsets.lookup('application/octet-stream', 'fallback'));
    test.finish();
  };
  if (module == require.main) {
    require('async_testing').run(__filename, process.ARGV);
  }
})(require('process'));
