var express = require('express');
var app = express();
var http = require('http').Server(app);

require('./index')(app);
var session = require('./auth')(app);
require('./socket')(http, session);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static('public'));

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});

