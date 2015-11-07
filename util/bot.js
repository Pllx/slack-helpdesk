var userController = require('./userController');
var requestController = require('./requestController');
var async = require('async');
var Slack = require('slack-client');
var config = require('./getConfig')();

function HelpDeskBot() {
  var bot = this;

  this.users = {};
  this.slack = new Slack(config.slackbot.token, true, true);
  
  this.slack.on('open', bot.loadUsers.bind(bot));
  this.slack.on('message', bot.handleMessage.bind(bot));
  this.slack.on('error', function(err) { console.error(err); });
  
}

HelpDeskBot.prototype.login = function() {
  this.slack.login();
};

HelpDeskBot.prototype.handleMessage = function(message) {
  var user = this.users[message.user];
  if (!user) {
    return this.loadUsers();
  }
  var messageObj = {
    text: message.text
  };
  
  requestController.createOrResolve(user, message, function(err, result) {
    if (err) console.error(err);
    console.log('Resolved or Created a request.');
    console.log(result);
  });
};

HelpDeskBot.prototype.loadUsers = function() {
  
  userController.loadUsers(this.slack, (err, users) => {
    if (err) return console.error(err);
    this.users = users;
  });
};

module.exports = HelpDeskBot;
