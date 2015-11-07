var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  opened: Date,
  respondedTo: Date,
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
