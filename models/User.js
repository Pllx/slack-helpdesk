var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: String,
  username: String,
  fullname: String,
  admin: Boolean,
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }]
});

var User = mongoose.model('User', userSchema);

User.findOrCreate = function(user, next) {
  User.findOne({ _id: user._id }, function(err, foundUser) {
    if (err) return next(err);
    if (!foundUser) {
      return User.create(user, function(err, newUser) {
        if (err) return next(err);
        return next(null, newUser);
      });
    }
    return next(null, foundUser);
  });
};

User.writeToJSON = function() {
  var fs = require('fs');
  var Path = require('path');
  
  User.find({}, function(err, users) {
    fs.writeFileSync(Path.join(__dirname, '/../users.json'), JSON.stringify(users, null, '\t'));
  });
  
};

module.exports = User;
