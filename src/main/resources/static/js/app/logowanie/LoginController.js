angular.module('app')
	.controller('LoginController', function($rootScope, $location, LoginService) {
		var vm = this;
		vm.credentials = {};
		$rootScope.user = "nieznajomy";
		var loginSuccess = function() {
			$rootScope.authenticated = true;
			$rootScope.user = vm.credentials.username;
			$location.path('/start');
		}
		vm.login = function() {
			LoginService.authenticate(vm.credentials, loginSuccess);
		}
		var logoutSuccess = function() {
			$rootScope.authenticated = false;
			$rootScope.user = "nieznajomy";
			$location.path('/start');
		}
		vm.logout = function() {
			LoginService.logout(logoutSuccess);

		}
	})
