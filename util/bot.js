var userController = require('./userController');
var requestController = require('./requestController');
var async = require('async');
var Slack = require('slack-client');
var config = require('./getConfig')();

function createBot() {
  var bot = new Slack(config.slackbot.token, true, true);
  
  bot.on('open', function() {
    console.log(`Connected to ${bot.team.name} as @${bot.self.name}`);
    
    userController.loadUsers(bot, function(err) {
      if (err) return console.error(err);
      console.log('Done loading users!');
    });
  });

  bot.on('message', function(message) {
    
    var channel = bot.getChannelGroupOrDMByID(message.channel);
    var user = bot.getUserByID(message.user);
    // console.log(channel);
    // console.log(user);
    
    // async.series([
    //   function(next) {
    //     userController.findOrCreate(bot, data, next);
    //   },
    //   function(next) {
    //     requestController.createOrResolve(bot, data, next);
    //   }
    // ],
    // function (err, results) {
    //   if (err) console.error(err);
    //   console.log(results);
    // });
  });
  
  bot.login();
  
  return bot;
}

module.exports = createBot;
