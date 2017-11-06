var express = require('express');
var app = express();
var restRouter = require('./router/rest');
var redirectRouter = require('./router/redirect')
var indexRouter = require('./router/index')
var mongoose = require('mongoose')
var useragent = require('express-useragent');
mongoose.connect("mongodb://user:user@ds115493.mlab.com:15493/tinyurl", {useMongoClient: true});
app.use(useragent.express());

app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/", express.static(__dirname));
app.use("/api/v1", restRouter);

app.use("/:shortUrl", redirectRouter);

app.use("/", indexRouter)

app.listen(4000);


