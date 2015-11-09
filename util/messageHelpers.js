var messageHelper = {};
var moment = require('moment');

messageHelper.isWorkDay = function() {
  // Operating Hours : Mon-Fri 9AM-8PM, Sat 9AM-6PM
  // false if before 9AM || after 8PM || Saturday && after 6PM || Sunday
  var date = new Date();
  var hour = date.getHours();
  var day = date.getDay();
  return !(hour < 9 || hour >= 20 || (hour >= 18 && day === 6) || day === 0);
};

module.exports = messageHelper;
