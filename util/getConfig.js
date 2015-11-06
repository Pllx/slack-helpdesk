var fs = require('fs');
var Path = require('path');

function getConfig(env) {
  
  var configPath = Path.join(__dirname, '/../config/' + env + '.json');
  
  var data = fs.readFileSync(configPath, 'utf8');
  var config = JSON.parse(data);

  return config;
}

module.exports = getConfig;
