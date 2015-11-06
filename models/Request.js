var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
  opened: Date,
  respondedTo: Date,
  requests: [{
    type: Schema.Types.ObjectId,
    ref: 'Request'
  }]
});

var Request = mongoose.model('Request', requestSchema);
