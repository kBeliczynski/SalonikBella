angular.module('app')
.controller('RegistrationController', function($http, $resource, $location) {
    var vm = this;
	var User = $resource('api/users');
    vm.user = new User();

	vm.register = function(user) {
		if(vm.invalidFormValue(user))
			return;
		user.$save(function(data) {
			$location.path('/zarejestrowano');
			vm.user = new User();
		});
	}

	vm.invalidFormValue = function (user) {
		if(user.firstName == undefined || user.lastName == undefined || user.email == undefined || user.password == undefined)
			return true;
		return false;
	}
});

