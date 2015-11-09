var requestHelpers = {};

requestHelpers.averageWaitTime = function(requests) {
  var sum = requests.reduce(function(acc, request, index) {
    return acc + (request.opened - request.respondedto);
  }, 0);
  return (sum / requests.length);
};

module.exports = requestHelpers;
