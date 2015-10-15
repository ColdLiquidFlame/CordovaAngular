(function() {
  angular
    .module('app', ['ngRoute', 'cordova-angular'])
    .config(config)
    .controller('NetworkInfoCtrl', networkInfoController);

  function networkInfoController($scope, networkInfo) {
    //$scope.connectionType = "Cordova is not ready.";


    $scope.connectionType = networkInfo.connectionType();
    $scope.status = $scope.connectionType === "none" ? "offline" : "online";
    networkInfo.online(function() {
      $scope.status = 'online';
      $scope.connectionType = networkInfo.connectionType();
    });

    networkInfo.offline(function() {
      $scope.status = 'offline';
      $scope.connectionType = networkInfo.connectionType();
    });
  }

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: networkInfoController,
        templateUrl: 'app/network-info.html',
        resolve: {
          cordovaReady: function(cordova) { return cordova.isReady(); }
        }
      })
      .otherwise('/');
  }
})();
