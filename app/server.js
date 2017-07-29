var express = require('express');
var app = express();
var restRouter = require('./router/rest');
var redirectRouter = require('./router/redirect')
var indexRouter = require('./router/index')
var mongoose = require('mongoose')

mongoose.connect("mongodb://user:user@ds115493.mlab.com:15493/tinyurl");
app.use("/public", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname));
app.use("/api/v1", restRouter);

app.use("/:shortUrl", redirectRouter);

app.use("/", indexRouter)

app.listen(3000);

