var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatsSchema = new Schema({
	shortUrl: String,
	referer: String,
	platform: String,
	browser: String,
	country: String,
	timestamp: Date
});

var statsModel = mongoose.model('StatsModel', StatsSchema);

module.exports = statsModel;