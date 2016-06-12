/* */ 
var url = require('url');
module.exports.rewriteLinks = function(userServer) {
  var host = userServer.hostname;
  var string = host;
  var port = userServer.port;
  if (host && port) {
    if (parseInt(port, 10) !== 80) {
      string = host + ":" + port;
    }
  }
  return {
    match: new RegExp("https?:\\\\/\\\\/" + string + "|https?://" + string + "(\/)?|('|\")(https?://|/|\\.)?" + string + "(\/)?(.*?)(?=[ ,'\"\\s])", "g"),
    fn: function(req, res, match) {
      var proxyUrl = req.headers["host"];
      if (match[0] === ".") {
        return match;
      }
      var captured = match[0] === "'" || match[0] === "\"" ? match[0] : "";
      var pre = "//";
      if (match[0] === "'" || match[0] === "\"") {
        match = match.slice(1);
      }
      var out = url.parse(match);
      if (!out.host) {
        string = string.replace(/^(\/)/, "");
        return captured + match.replace(string, proxyUrl);
      }
      if (out.path === "/") {
        if (match.slice(-1) === "/") {
          out.path = "/";
        } else {
          out.path = "";
        }
      }
      return [captured, pre, proxyUrl, out.path || "", out.hash || ""].join("");
    }
  };
};
module.exports.checkCookies = function checkCookies(res) {
  if (typeof(res.headers["set-cookie"]) !== "undefined") {
    res.headers["set-cookie"] = res.headers["set-cookie"].map(function(item) {
      return rewriteCookies(item);
    });
  }
};
function rewriteCookies(rawCookie) {
  var objCookie = (function() {
    var obj = {};
    var pairs = rawCookie.split(/; */);
    pairs.forEach(function(pair) {
      var eqIndex = pair.indexOf("=");
      if (eqIndex < 0) {
        return;
      }
      var key = pair.substr(0, eqIndex).trim();
      obj[key] = pair.substr(eqIndex + 1, pair.length).trim();
    });
    return obj;
  })();
  var pairs = Object.keys(objCookie).filter(function(item) {
    return item !== "domain";
  }).map(function(key) {
    return key + "=" + objCookie[key];
  });
  if (rawCookie.match(/httponly/i)) {
    pairs.push("HttpOnly");
  }
  return pairs.join("; ");
}
module.exports.rewriteCookies = rewriteCookies;
