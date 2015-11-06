var fs = require('fs');
var Path = require('path');

function getConfig() {
  
  var configPath = Path.join(__dirname, '/../config/' + process.env.NODE_ENV + '.json');
  
  var data = fs.readFileSync(configPath, 'utf8');
  var config = JSON.parse(data);

  return config;
}

module.exports = getConfig;
