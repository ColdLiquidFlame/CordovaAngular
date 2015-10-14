(function(){
	angular
		.module('app', [])
		.factory('cordova', cordovaFactory)
		.controller('DefaultCtrl', defaultController);
		
	function cordovaFactory($document, $q) {	
		var deferred = $q.defer();
				
		var service = {
			isReady: isReady
		}; 
		
		return service;		
		
		$document.addEventListener('deviceready', deviceReadyCallback, false);
		
		function isReady() {
			return deferred.promise;
		}
		
		function deviceReadyCallback() {
			deferred.resolve(true);
		}
	}
	
	function defaultController($scope, cordova) {
		$scope.message = "Cordova is not ready.";
		
		cordova.isReady().then(function(deviceReady) {
			$scope.message = "Cordova is ready!";
		});
	}
})();