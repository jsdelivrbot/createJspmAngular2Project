/* */ 
var assert = require('../better-assert@1.0.2');
test();
function test() {
  var user = {name: 'tobi'};
  assert('tobi' == user.name);
  assert('number' == typeof user.age);
}
