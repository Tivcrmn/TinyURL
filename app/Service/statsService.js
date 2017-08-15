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
	req.timestamp = new Date();
	var geo = geoip.lookup(reqInfo.ip);
	if (geo) {
		reqInfo.country = geo.country
	} else {
		reqInfo.country = "Unknown"
	}
	console.log(reqInfo);
}

module.exports = {
	loginRequest: loginRequest
}