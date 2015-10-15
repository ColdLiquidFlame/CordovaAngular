(function() {
  angular
    .module('cordova-angular', [])
    .factory('cordova', cordovaFactory)
    .factory('networkInfo', networkInfoFactory);

  function cordovaFactory($document, $q) {
    var isDeviceReady = false;

    var service = {
      isReady: isReady
    };

    return service;

    function isReady() {
      var deferred = $q.defer();

      if (isDeviceReady === true) {
        deferred.resolve('device is ready');
      } else {
        document.addEventListener('deviceready', deviceReadyCallback);

        function deviceReadyCallback() {
          isDeviceReady = true;
          deferred.resolve('device is ready');
        }
      }

      return deferred.promise;
    }
  }

  function networkInfoFactory($window, $q, $rootScope) {
    var service = {
      connectionType: connectionType,
      online: online,
      offline: offline
    }

    return service;

    function isNetworkInfoAvailable() {
      if ($window.navigator.connection) {
        return true;
      }
      return false;
    }

    function connectionType() {
      if (isNetworkInfoAvailable()) {
        return $window.navigator.connection.type;
      }
    }

    function online(callback) {
      document.addEventListener('online', function() {
        $rootScope.$apply(callback);
      });
    }

    function offline(callback) {
      document.addEventListener('offline', function() {
        $rootScope.$apply(callback);
      });
    }
  }
})();
