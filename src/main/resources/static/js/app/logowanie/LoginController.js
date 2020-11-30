angular.module('app')
	.controller('LoginController', function($rootScope, $location, LoginService) {
		var vm = this;
		vm.credentials = {};
		$rootScope.loggedUser = {};
		var loginSuccess = function(user) {
			$rootScope.authenticated = true;
			$rootScope.loggedUser = user;
			$location.path('/start');
		}
		vm.login = function() {
			LoginService.authenticate(vm.credentials, loginSuccess);
		}
		var logoutSuccess = function() {
			$rootScope.authenticated = false;
			$rootScope.loggedUser = {};
			$location.path('/start');
		}
		vm.logout = function() {
			LoginService.logout(logoutSuccess);

		}
	})
