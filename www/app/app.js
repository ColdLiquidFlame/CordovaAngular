(function() {
  angular
    .module('app', [])
    .factory('cordova', cordovaFactory)
		.factory('networkInfo', networkInfoFactory)
    .controller('DefaultCtrl', defaultController);

  function cordovaFactory($document, $q) {
    var isDeviceReady = true;

    var service = {
      isReady: isReady
    };

    return service;



    function isReady() {
      var deferred = $q.defer();

      if (isDeviceReady === true) {
        deferred.resolve('true');
      } else {
        document.addEventListener('deviceready', deviceReadyCallback, false);

        function deviceReadyCallback() {
          deferred.resolve('true');
        }
      }

      return deferred.promise;
    }


  }

	function networkInfoFactory($window, $q, cordova) {
		var service = {
			connectionType: connectionType
		}

		return service;

		function connectionType () {
			var deferred = $q.defer();

			cordova
				.isReady()
				.then(function() {
					deferred.resolve(angular.toJson(navigator.connection.type));
				});

			return deferred.promise;
		}
	}

  function defaultController($scope, networkInfo) {
    $scope.message = "Cordova is not ready.";

    networkInfo.connectionType().then(function(connectionType) {
      $scope.message = connectionType;
    });
  }
})();
