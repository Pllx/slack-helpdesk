var userController = require('./userController');
var requestController = require('./requestController');
var async = require('async');
var Slack = require('slack-client');
var config = require('./getConfig')();

function createBot() {
  var bot = new Slack(config.slackbot.token, true, true);
  
  bot.on('open', function() {
    
    // bot.postMessageToUser('davidpetri', 'hi', function(data) {
    //   console.log('message reply');
    //   console.log(data);
    // });
    console.log(`Connected to ${bot.team.name} as @${bot.self.name}`);
    // userController.loadUsers(bot, function(err) {
      
    // });
  });

  bot.on('message', function(message) {
    
    var channel = bot.getChannelGroupOrDMByID(message.channel);
    var user = bot.getUserByID(message.user);
    // console.log(channel);
    // console.log(user);
    
    return;
    
    async.series([
      function(next) {
        userController.findOrCreate(bot, data, next);
      },
      function(next) {
        requestController.createOrResolve(bot, data, next);
      }
    ],
    function (err, results) {
      if (err) console.error(err);
      console.log(results);
    });
  });
  
  bot.login();
  
  return bot;
}

module.exports = createBot;
