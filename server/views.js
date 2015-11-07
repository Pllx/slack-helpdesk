var Path = require('path');

exports.register = function(server, options, next) {

  server.register(require('vision'), function(err) {
    if (err) throw err;
    
    server.views({
      engines: {
        jade: require('jade')
      },
      path: Path.join(__dirname, '/../templates'),
      compileOptions: {
        pretty: true
      }
    });
    
    console.log('templates in ' + Path.join(__dirname, '/../'));
    
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.view('index', { title: 'Help Desk Portal' });
      }
    });
    
    next();
    
  });
  
};

exports.register.attributes = {
    name: 'views'
};
