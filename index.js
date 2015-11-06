var SlackBot = require('slackbots');
var getConfig = require('./util/getConfig');
var mongoose = require('mongoose');
var config = getConfig(process.env.NODE_ENV);

mongoose.connect(config.mongoose.uri);

var bot = new SlackBot({
  token: config.slackbot.token,
  name: config.slackbot.name
});

bot.on('start', function() {
  
  bot.postMessageToUser('davidpetri', 'hi', function(data) {
    console.log('message reply');
    console.log(data);
  });
});

bot.on('message', function(data) {
  console.log('on message');
  console.log(data);
});
