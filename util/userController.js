var User = require('../models/User');
var Request = require('../models/Request');
var requestController = require('./requestController');
var async = require('async');

var userController = {};

userController.loadUsers = function(bot, next) {
  
  var users = {};
  
  async.forEachOf(bot.users, function(user, key, done){
    
    var newUser = {
      _id: user.id,
      username: user.name,
      fullname: user.real_name,
      admin: false
    };
    
    User.findOrCreate(newUser, function(err, createdUser) {
      if (err) return done(err);
      users[createdUser._id] = createdUser;
      return done();
    });
    
  }, function(err) {
      if (err) return next(err);
      console.log('finished adding users');
      return next(null, users);
    });
  
};

module.exports = userController;
