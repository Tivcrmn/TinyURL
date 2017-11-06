angular.module("tinyurlApp")
	.controller("urlController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
		
		var getInfo = function (info) {
			$http.get("/api/v1/urls/" + $routeParams.shortUrl + '/' + info)
				.then(function (res) {
					var label = info + "Label"
					var data = info + "Data"
					$scope[label] = []
					$scope[data] = []
					res.data.forEach(function (value) {
						$scope[label].push(value._id)
						$scope[data].push(value.count)
					})
				})
		}
		
		$scope.hour = 'hour'
		$scope.day = 'day'
		$scope.month = 'month'
		$scope.time = $scope.hour

		$scope.getInfoByTime = function (time) {
			$http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
				.then(function (res) {
					var span = ''
					$scope.label = []
					$scope.data = []
					res.data.forEach(function (item) {
						if (time === 'hour') {
							if (item._id._minute < 10) {
								span = item._id.hour + ':0' + item._id.minute 
							} else {
								span = item._id.hour + ':' + item._id.minute
							}
						} else if (time === 'day') {
							span = item._id.hour + ':00' 
						} else if (time === 'month') {
							span = item._id.month + '/' + item._id.day
						}
						$scope.label.push(span)
						$scope.data.push(item.count)
					})
				})
		}

		$http.get("/api/v1/urls/" + $routeParams.shortUrl)
			.then(function (res) {
				$scope.longUrl = res.data.longUrl;
				$scope.shortUrl = "http://localhost:4000/" + res.data.shortUrl;
			});

		$http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
			.then(function (res) {
				$scope.totalClicks = res.data.totalClicks
			});

		$scope.getInfoByTime($scope.hour)

		getInfo("country")
		getInfo("referer")
		getInfo("platform")
		getInfo("browser")
	}]);