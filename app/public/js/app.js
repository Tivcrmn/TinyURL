var app = angular.module('tinyurlApp', ["chart.js", "ngResource", "ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "./public/views/home.html",
			controller: "homeController"
		})
		.when("/urls/:shortUrl", {
			templateUrl: "./public/views/url.html",
			controller: "urlController"
		});
});

