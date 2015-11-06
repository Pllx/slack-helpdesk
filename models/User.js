var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  fullname: String,
  admin: Boolean,
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }]
});

var User = mongoose.model('User', userSchema);
