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

	vm.changePassword = function (value) {
		Users.get($rootScope.userId).$promise.then( user => {
			$rootScope.enterUserData = false;
			user.password = value.password;
			Users.update(user);
			$location.path("/login");
		}).catch( err => console.log(err))
	}
});
