/* */ 
var express = require('../express@2.5.11');
var app = express.createServer();
app.use(express.logger('dev'));
app.get('/', function(req, res) {
  console.log(req.protocol);
  res.send('hello');
});
app.listen(3000);
