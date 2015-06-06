'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;


	    var mapOptions = {
	        zoom: 4,
	        center: new google.maps.LatLng(-31.408740136908474,-64.18624877929688),
	        mapTypeId: google.maps.MapTypeId.TERRAIN
	    }

	    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		var myLatlng = new google.maps.LatLng(-31.408740136908474,-64.18624877929688);

		$scope.marker = new google.maps.Marker({
		    map: $scope.map,
		    draggable: true,
		    animation: google.maps.Animation.DROP,
		    position: myLatlng
		});
		google.maps.event.addListener($scope.marker, 'dragend', function() {
		    var ll = $scope.marker.getPosition();
		    console.log('your marker is at:', ll.lat(), ll.lng());
		});

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
				latlng: [
					$scope.marker.getPosition().lng(), 
					$scope.marker.getPosition().lat()
				]
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);