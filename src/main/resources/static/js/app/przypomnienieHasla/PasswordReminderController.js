angular.module('app')
.controller('PasswordReminderController', function($http, $resource, $location) {
    var vm = this;
	var User = $resource('api/users');
    vm.user = new User();
	vm.userSearched = new User();

	vm.checkValid = function(user) {
		vm.userSearched.
		vm.user.$save(function(data) {
			$location.path('/login');
			vm.user = new User();
		});
	}
});
