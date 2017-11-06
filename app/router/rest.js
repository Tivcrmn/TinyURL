var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlService = require("../Service/urlService");
var statsService = require("../Service/statsService");
router.post("/urls", jsonParser, function (req, res) {
	var longUrl = req.body.longUrl;
	urlService.getShortUrl(longUrl, function (url) {
		res.json(url);
	});
	
})
router.get("/urls/:shortUrl", function (req, res) {
	var shortUrl = req.params.shortUrl;
	urlService.getLongUrl(shortUrl, function (url) {
		res.json(url);
	});
})

router.get("/urls/:shortUrl/totalClicks", function (req, res) {
	var shortUrl = req.params.shortUrl;
	statsService.getClicks(shortUrl, function (totalClicks) {
		res.json(totalClicks)
	})
})

router.get("/urls/:shortUrl/:info", function (req, res) {
	var shortUrl = req.params.shortUrl;
	var info = req.params.info;
	statsService.getInfo(shortUrl, info, function (info) {
		res.json(info)
	})
})
module.exports = router;
