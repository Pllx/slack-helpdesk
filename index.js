var SlackBot = require('slackbots');
var getConfig = require('./util/getConfig');

var config = getConfig(process.env.NODE_ENV).slackbot;

var bot = new SlackBot({
  token: config.token,
  name: config.name
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
