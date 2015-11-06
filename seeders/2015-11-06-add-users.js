var mongoose = require('mongooose');
var config = getConfig();
var User = require('./../models/User');
var Request = require('./../models/Request');

mongoose.connect(config.mongoose.uri, config.mongoose.options);

var users = [
  {
    _id: 'U06LWN6UR',
    name: 'David Petri',
    admin: true
  },
  {
    _id: 'U06STB63Z',
    name: 'Ben Tan',
    admin: true
  }
];

users.forEach(function(user) {
  User.create(user, function(err, user) {
    console.log(user);
  });
});
