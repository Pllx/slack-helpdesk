var mongoose = require('mongoose');
var config = require('../util/getConfig')();
mongoose.connect(config.mongoose.uri, config.mongoose.options);

require('./add-users.js');
require('./add-requests.js');
