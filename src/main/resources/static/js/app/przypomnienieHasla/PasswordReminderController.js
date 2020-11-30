angular.module('app')
.controller('PasswordReminderController', function($http, $resource, $location) {
    var vm = this;
	var User = $resource('api/users');
    vm.user = new User();

	vm.change = function(user) {
		vm.user.$save(function(data) {
			$location.path('/login');
			vm.user = new User();
		});
	}
});
