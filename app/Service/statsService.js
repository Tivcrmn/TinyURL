var statsModel = require('../models/statsModel');
var geoip = require('geoip-lite');

var loginRequest = function (shortUrl, req) {
	var reqInfo = {};
	reqInfo.shortUrl = shortUrl;
	reqInfo.referer = req.headers.referer || "Unknown";
	reqInfo.platform = req.useragent.platform || "Unknown";
	reqInfo.browser = req.useragent.browser || "Unknown";
	reqInfo.ip = req.headers["x-forwarded-for"] ||
				 req.connection.remoteAddress ||
				 req.socket.remoteAddress ||
				 req.connection.socket.remoteAddress;
	reqInfo.timestamp = new Date();
	var geo = geoip.lookup(reqInfo.ip);
	if (geo) {
		reqInfo.country = geo.country
	} else {
		reqInfo.country = "Unknown"
	}
	var stats = new statsModel(reqInfo);
	stats.save()
}

var getClicks = function (shortUrl, callback) {
	statsModel.count({shortUrl: shortUrl}, function (err, data) {
		var totalClicks = {
			totalClicks: data
		}
		callback(totalClicks)
	})
}

var getInfo = function (shortUrl, info, cb) {
	var _info = null
	if (info === "hour") {
		_info = {
			year: {$year: "$timestamp"},
			month: {$month: "$timestamp"},
			day: {$dayOfMonth: "$timestamp"},
			hour: {$hour: "$timestamp"},
			minute: {$minute: "$timestamp"}
		}
	} else if (info === "day") {
		_info = {
			year: {$year: "$timestamp"},
			month: {$month: "$timestamp"},
			day: {$dayOfMonth: "$timestamp"},
			hour: {$hour: "$timestamp"}
		}
	} else if (info === "month") {
		_info = {
			year: {$year: "$timestamp"},
			month: {$month: "$timestamp"},
			day: {$dayOfMonth: "$timestamp"}
		}
	} else {
		_info = '$' + info
	}

	statsModel.aggregate([{$match: {shortUrl: shortUrl}}, 
												{$sort: {timestamp: -1}}, 
												{$group: {_id: _info, count: {$sum: 1}}}], 
												function (err, data) {
													cb(data)
												})
}

module.exports = {
	loginRequest: loginRequest,
	getClicks: getClicks,
	getInfo: getInfo
}