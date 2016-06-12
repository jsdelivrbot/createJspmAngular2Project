/* */ 
(function(process) {
  module.exports = function profiler() {
    return function(req, res, next) {
      var end = res.end,
          start = snapshot();
      function snapshot() {
        return {
          mem: process.memoryUsage(),
          time: new Date
        };
      }
      res.end = function(data, encoding) {
        res.end = end;
        res.end(data, encoding);
        compare(req, start, snapshot());
      };
      next();
    };
  };
  function compare(req, start, end) {
    console.log();
    row(req.method, req.url);
    row('response time:', (end.time - start.time) + 'ms');
    row('memory rss:', formatBytes(end.mem.rss - start.mem.rss));
    row('memory vsize:', formatBytes(end.mem.vsize - start.mem.vsize));
    row('heap before:', formatBytes(start.mem.heapUsed) + ' / ' + formatBytes(start.mem.heapTotal));
    row('heap after:', formatBytes(end.mem.heapUsed) + ' / ' + formatBytes(end.mem.heapTotal));
    console.log();
  }
  function row(key, val) {
    console.log('  \033[90m%s\033[0m \033[36m%s\033[0m', key, val);
  }
  function formatBytes(bytes) {
    var kb = 1024,
        mb = 1024 * kb,
        gb = 1024 * mb;
    if (bytes < kb)
      return bytes + 'b';
    if (bytes < mb)
      return (bytes / kb).toFixed(2) + 'kb';
    if (bytes < gb)
      return (bytes / mb).toFixed(2) + 'mb';
    return (bytes / gb).toFixed(2) + 'gb';
  }
  ;
})(require('process'));
