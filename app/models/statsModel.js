var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatsSchema = new Schema({
	shortUrl: String,
});

var statsModel = mongoose.model('StatsModel', StatsSchema);

module.exports = statsModel;