var Request = require('./../models/Request');

var requests = [
  
];

requests.forEach(function(request) {
  Request.create(request, function(err, request) {
    console.log(request);
  });
});
