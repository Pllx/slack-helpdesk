var mongoose = require('mongoose');
var Bot = require('./util/bot');

var getConfig = require('./util/getConfig');
var config = getConfig(process.env.NODE_ENV);

mongoose.connect(config.mongoose.uri, config.mongoose.options);

var helpDeskBot = new Bot();
helpDeskBot.login();
