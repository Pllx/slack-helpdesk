var mongoose = require('mongoose');
var Hapi = require('hapi');
var Bot = require('./util/bot');

var port = process.env.PORT || 3000;

var getConfig = require('./util/getConfig');
var config = getConfig(process.env.NODE_ENV);

mongoose.connect(config.mongoose.uri, config.mongoose.options);
var helpDeskBot = Bot();

var server = new Hapi.Server();
server.connection({
  host : 'localhost',
  port : 3000
});

server.route({
  method: 'GET',
  path : '/stats',
  handler : function (req, res) {
    console.log(req.params);
    return res('hello!');
  }
});

server.start(function(err) {
  if (err) throw err;
  console.log(server);
  console.log('Server running on:',server.info.uri);
});
