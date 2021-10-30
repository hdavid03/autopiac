var express = require('express');
var body_parser = require('body-parser');
var app = express();

app.use(express.static('static'));
// Load routing
require('./route/index')(app);
var server = app.listen(3000, function () {
console.log('port on: 3000');
});
