var mongoose = require('mongoose');
var Hapi = require('hapi');
var Inert = require('inert');
var HelpDeskBot = require('./util/HelpDeskBot');
var adminController = require('./server/controllers/adminController');

var port = process.env.PORT || 3000;

var getConfig = require('./util/getConfig');
var config = getConfig(process.env.NODE_ENV);

mongoose.connect(config.mongoose.uri, config.mongoose.options);

var helpDeskBot = new HelpDeskBot({ channels: config.slackbot.channels });
helpDeskBot.login();

var server = new Hapi.Server();
server.connection({
  host : 'localhost',
  port : 3000
});

server.register(Inert, function(err) {
  if (err) throw err;
});

server.route({
  method: 'GET',
  path : '/stats',
  handler : function (req, reply) {
    // console.log(req.params);
    reply.file('./client/index.html');
    //res.file('./client/index.html');
    //return res('hello!');
  }
});

server.route({
  method: 'GET',
  path: '/api/adminTotals',
  handler: adminController.getTotals
});

server.register([
  {
    register: require('./server/views.js')
  }
], function(err) {
  if (err) throw err;
  
  server.start(function(err) {
    if (err) throw err;
    console.log('Server running on:', server.info.uri);
  });
});
