angular.module("tinyurlApp")
	.controller("homeController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
		$scope.submit = function () {
			$http.post("/api/v1/urls", {
				"longUrl": $scope.longUrl,
			}).then(function successCallback(response) {
				console.log(response.data);
				$location.path("/urls/" + response.data.shortUrl);
			});
		}
	}]);