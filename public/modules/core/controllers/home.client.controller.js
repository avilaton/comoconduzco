'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  '$http', '$location', 'Articles',
	function($scope, Authentication, $http, $location, Articles) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

	    var mapOptions = {
	        zoom: 4,
	        center: new google.maps.LatLng(-31.408740136908474,-64.18624877929688),
	        mapTypeId: google.maps.MapTypeId.TERRAIN
	    }

	    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		var myLatlng = new google.maps.LatLng(-31.408740136908474,-64.18624877929688);

		function addMarker (latlng) {
			var marker = new google.maps.Marker({
			    map: $scope.map,
			    animation: google.maps.Animation.DROP,
			    // icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
			    position: new google.maps.LatLng(latlng[1] || 0, latlng[0] ||0)
			});
			return marker;
		}

		$scope.marker = new google.maps.Marker({
		    map: $scope.map,
		    draggable: true,
		    animation: google.maps.Animation.DROP,
		    position: myLatlng
		});
		google.maps.event.addListener($scope.marker, 'dragend', function() {
		    var ll = $scope.marker.getPosition();
		});


		$scope.find = function() {
			$scope.markers = [];
			$scope.articles = Articles.query(function () {	
				$scope.articles.forEach(function (article) {
					if (article.latlng) {
						addMarker(article.latlng)
					};
				});
			});
		};
		$scope.find();
	}
]);