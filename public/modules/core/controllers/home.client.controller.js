'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  '$http', '$location',
	function($scope, Authentication, $http, $location) {
		// This provides Authentication context.
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
	    console.log(ll.lat(), ll.lng());
	});

	}
]);