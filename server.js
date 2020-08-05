var express = require('express');
var path = require('path');
var PORT = 5001;
var app = express();

app.use(express.static(path.join(__dirname + '/js')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function () {
  console.log('app is running on port:', PORT);
});
