(function() {
  angular
    .module('app', ['cordova-angular'])
    .controller('DefaultCtrl', defaultController);

  function defaultController($scope, networkInfo) {
    $scope.message = "Cordova is not ready.";

    networkInfo.connectionType().then(function(connectionType) {
      $scope.message = connectionType;
    });
  }
})();
