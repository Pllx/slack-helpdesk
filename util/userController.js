var User = require('../models/User');
var Request = require('../models/Request');
var requestController = require('./requestController');
var async = require('async');

var userController = {};

userController.loadUsers = function(bot, next) {
  
  async.forEachOf(bot.users, function(user, key, done){
    
    var newUser = {
      _id: user.id,
      username: user.name,
      fullname: user.real_name,
      admin: false
    };
    
    User.findOrCreate(newUser, function(err, createdUser) {
      if (err) return done(err);
      return done();
    });
    
  }, function(err) {
      if (err) return next(err);
      console.log('finished adding users');
      return next();
    });
  
};

// userController.findOrCreate = function(bot, user, next) {
//   
//   User.findOne({ _id: user._id }, function(err, user) {
//     if (err) return next(err);
//     if (!user) {
//       return createUser(bot, data, next);
//     }
//     
//     return next(null, user);
//   });
// };
// 
// function createUser(bot, data, next) {
//   bot.getUser(data.user, function(data) {
//     console.log(data);
//     
//     // User.create({
//     //   name: dat
//     // });
//     return next(data);
//   });
// 
// }

module.exports = userController;
