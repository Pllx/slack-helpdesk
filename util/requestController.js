var mongoose = require('mongoose');
var User = require('../models/User');
var Request = require('../models/Request');

var requestController = {};

requestController.createOrResolve = function(user, message, next) {
  User.findOne({ _id: user._id }).populate('requests').exec(function(err, user) {
    
    if (user.admin) {
      console.log('admin user');
      // attempt to resolve something
      return handleAdminResponse(user, message, next);
      
    } else {
      console.log('normal user');
      // attempt to open
      return handleStudentRequest(user, message, next);
    }
    

  });
};

requestController.create = function(user, message, next) {
  var newRequest = {
    opened: new Date().toUTCString(),
    respondedTo: null,
    text: message
  };
  Request.create(newRequest, function(err, request) {
    if (err) return next(err);
    if (!request) return next(null, false);
    user.requests.push(request._id);
    user.save(function(err, result) {
      if (err) return next(err);
      next(null, request);
    });
  });
};

requestController.resolve = function(user, request, next) {
  next(null, request);
};

function handleStudentRequest(user, message, next) {
  // find open request
  var request = user.requests.find((req) => req.respondedTo === null);
  
  // no open requests, so create one
  if (!request) return requestController.create(user, message, next);
  
  // have an open request already
  console.log('adding to open request');
  request.text += message;
  request.save(function(err, result) {
    if (err) return next(err);
    return next(null, result);
  });
}

function handleAdminResponse(user, message, next) {
  console.log('handling admin response');
  console.log(user);
  console.log(message.text);

  // var student = message.text.split('@')[1].split('>')[0];
  var student = '';
  if (/<@(\w+)>/.test(message.text)) {
    student = message.text.match(/<@(\w+)>/)[1];    
  }
  
  if (student) {
    requestController.getOpenRequestForUser(student, function(err, openRequest) {
      if (err) return next(err);
      if (!openRequest) return next(null, 'No open requests for ' + student);
      
      console.log('FOUND AN OPEN REQUEST for ', student);
      openRequest.respondedTo = new Date().toUTCString();
      openRequest.save(function(err, result) {
        if (err) return next(err);
        
        console.log('result of added request');
        console.log(result);
        user.closedRequests.push(openRequest._id);
        
        user.save(function(err, user) {
          if (err) return next(err);
          
          return next(null, result);
        });
      });
    });
  } else {
    // request wasn't to a student so close the most recently opened request?
    next(null, false);
  }
    
}

requestController.getOpenRequestForUser = function(userID, next) {
  User.findOne({ _id: userID }).populate('requests').exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(null, false);
    
    var openRequest = user.requests.find((req) => req.respondedTo === null);
    
    next(null, openRequest);
  });
};

requestController.getAllOpenRequests = function(next) {
  Requests.find({ respondedTo: null }, function(err, requests) {
    if (err) return next(err);
    if (!requests) return next(err, false);
    
    next(null, requests);
  });
};

requestController.getAllRequestsForUser = function(userID, next) {
  User.findOne({ _id: userID }).populate('requests').exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(null, false);
        
    next(null, user.requests);
  });
};

module.exports = requestController;
