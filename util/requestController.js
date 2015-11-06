var User = require('../models/User');
var Request = require('../models/Request');

var requestController = {};

requestController.createOrResolve = function(bot, data, next) {
  
  next('i am a failure');
};

module.exports = requestController;
