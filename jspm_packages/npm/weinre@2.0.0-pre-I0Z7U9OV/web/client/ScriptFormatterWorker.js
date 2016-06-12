/* */ 
(function(process) {
  var parse = loadModule("parse-js.js");
  var process = loadModule("process.js");
  onmessage = function(event) {
    var source = event.data;
    var formattedSource = beautify(source);
    var mapping = buildMapping(source, formattedSource);
    postMessage({
      formattedSource: formattedSource,
      mapping: mapping
    });
  };
  function beautify(source) {
    var ast = parse.parse(source);
    var beautifyOptions = {
      indent_level: 4,
      indent_start: 0,
      quote_keys: false,
      space_colon: false
    };
    return process.gen_code(ast, beautifyOptions);
  }
  function buildMapping(source, formattedSource) {
    var mapping = {
      original: [],
      formatted: []
    };
    var lastCodePosition = 0;
    var regexp = /[\$\.\w]+|{|}/g;
    while (true) {
      var match = regexp.exec(formattedSource);
      if (!match)
        break;
      var position = source.indexOf(match[0], lastCodePosition);
      if (position === -1)
        continue;
      mapping.original.push(position);
      mapping.formatted.push(match.index);
      lastCodePosition = position + match[0].length;
    }
    return mapping;
  }
  function loadModule(src) {
    var request = new XMLHttpRequest();
    request.open("GET", src, false);
    request.send();
    var exports = {};
    eval(request.responseText);
    return exports;
  }
  function require() {
    return parse;
  }
})(require('process'));
