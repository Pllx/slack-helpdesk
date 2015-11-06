var SlackBot = require('slackbots');
var getConfig = require('./util/getConfig');

var config = getConfig('development').slackbot;

var bot = new SlackBot({
  token: config.token,
  name: config.name
});
