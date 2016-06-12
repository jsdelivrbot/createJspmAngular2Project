var express = require('./jspm_packages/npm/express@4.13.4/lib/express');
var mergedescriptors = require('./jspm_packages/npm/merge-descriptors@1.0.1');
// var express = require('express');

var app = express();

//load index.html,this path is index.html path
app.use(express.static(__dirname + './'));

app.listen(6000);

console.log('myserver is runing @ 6000');
