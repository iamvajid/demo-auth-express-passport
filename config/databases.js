

var credentials = require('./credentials.js');

var db_config = {
	url : credentials['mongoURL']
}

module.exports = db_config;