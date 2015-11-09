var userController = require('./userController');
var requestController = require('./requestController');
var messageHelpers = require('./messageHelpers');
var requestHelpers = require('./requestHelpers');
var async = require('async');
var Slack = require('slack-client');
var config = require('./getConfig')();
var moment = require('moment');


function HelpDeskBot(options) {
  var bot = this;
  
  this.channels = [];
  
  if (options) {
    this.channels = options.channels || [];
  }

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
  var channel = this.slack.getChannelGroupOrDMByID(message.channel);
  
  if (channel.is_im) return this.handleDM(message, channel);

  if (!channel.is_channel) {
    console.error('Was not a channel or a DM. Weird.');
    return;
  }
  
  // Only care about channels bot is watching
  if (this.channels.indexOf(channel.name) === -1) return;
  
  var user = this.users[message.user];
  if (!user) {
    console.log('Could not find user, loading users again...');
    return this.loadUsers();
  }
  var messageObj = {
    text: message.text
  };
  
  requestController.createOrResolve(user, message, function(err, result) {
    if (err) console.error(err);
    console.log(result);
  });
};

HelpDeskBot.prototype.loadUsers = function() {
  userController.loadUsers(this.slack, (err, users) => {
    if (err) return console.error(err);
    this.users = users;
  });
};

HelpDeskBot.prototype.handleDM = function(message, channel) {
  var user = this.users[message.user];
  var response = '';
  
  if (!user) {
    console.log('Could not find user, loading users again...');
    return this.loadUsers();
  }
  
  switch (message.text) {
    case '!status':
      requestController.getOpenRequest(user.id, function(err, request) {
        if (err) return console.error(err);
        
        if (!request) {
          response = 'You currently have no open help requests.';
        } else {
          var timeAgo = moment().from(request.opened);
          response = `You opened a request with the text "${request.text}" ${timeAgo}`;
        }
        
        channel.send(response);
      });
      break;
    case '!history':
      requestController.getAllRequests(user.id, function(err, requests) {
        if (err) return console.error(err);
        
        if (!requests || requests.length === 0) {
          response = `You've never made a help desk request! You should probably try, I hear it's awesome.`;
        } else {
          var numRequests = requests.length;
          var averageWaitTime = requestHelpers.averageWaitTime(requests);
          
          response = `You've submitted ${requests.length} help desk requests and ` +
                     `the average response time has been ${averageWaitTime} ms.`;
        }
        channel.send(response);

      });
      break;
    default:
      response = `I don't know what to do with that command! Try \`!history\` or \`!status\`.`;
      channel.send(response);
      break;
  }
  
  
};


module.exports = HelpDeskBot;
