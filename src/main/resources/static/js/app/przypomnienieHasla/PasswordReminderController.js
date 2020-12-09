angular.module('app')
.controller('PasswordReminderController', function($http, $resource, $location, $rootScope, Users) {
    var vm = this;
    vm.users = Users.getAll();

	vm.checkValid = function() {
		for(var u of vm.users){
			if(u.email.toLowerCase() === vm.user.email.toLowerCase() && u.firstName.toLowerCase() ===  vm.user.firstName.toLowerCase() && u.lastName.toLowerCase() ===  vm.user.lastName.toLowerCase()){
				$rootScope.userId = u.id;
				$rootScope.enterUserData = true;
				break;
			}
		}
		$location.path("/zmien-haslo");
	}

	vm.changePassword = function (user) {
		vm.user = Users.get($rootScope.userId);
		vm.user.password = user.password;
        vm.user.id = $rootScope.userId;
		$rootScope.enterUserData = false;
        Users.update(vm.user);
        $location.path("/login");
	}
});
