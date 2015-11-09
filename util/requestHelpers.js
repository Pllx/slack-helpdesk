var moment = require('moment');

var requestHelpers = {};

requestHelpers.averageWaitTime = function(requests) {
  var sum = requests.reduce(function(acc, request, index) {
    return acc + (request.respondedTo - request.opened);
  }, 0);
  
  var average = (sum / requests.length);
  var ms = moment().get('millisecond');
  
  return moment().set('millisecond', ms - average).fromNow(true);
};

module.exports = requestHelpers;
