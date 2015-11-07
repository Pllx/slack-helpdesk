var User = require('../../models/User');
var Request = require('../../models/Request');

var adminController = {};

adminController.getTotals = function(req, reply) {
  User.find({ admin: true }).populate('closedRequests').exec(function(err, admins) {
    if (err) {
      console.error(err);
      return reply(err);
    }
    
    reply(admins);
  });
};

module.exports = adminController;
