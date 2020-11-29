angular.module('app')
.controller('RegistrationController', function($http, $resource, $location) {
    var vm = this;
	var User = $resource('api/users');
    vm.user = new User();

	vm.register = function(user) {
		vm.user.$save(function(data) {
			$location.path('/zarejestrowano');
			vm.user = new User();
		});
	}
});

