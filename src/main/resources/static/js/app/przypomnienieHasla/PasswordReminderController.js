angular.module('app')
.controller('PasswordReminderController', function($http, $resource, $location, $rootScope, Users) {
    var vm = this;
    vm.users = Users.getAll();
	vm.invalidUserData = false;

	vm.checkValid = function(user) {
		vm.invalidUserData = true;
		if(vm.invalidFormValue(user))
			return;
		for(var u of vm.users){
			if(u.email.toLowerCase() === vm.user.email.toLowerCase() && u.firstName.toLowerCase() ===  vm.user.firstName.toLowerCase() && u.lastName.toLowerCase() ===  vm.user.lastName.toLowerCase()){
				$rootScope.userId = u.id;
				vm.invalidUserData = false;
				$location.path("/zmien-haslo");
				return;
			}
		}
	}

	vm.changePassword = function (value) {
		Users.get($rootScope.userId).$promise.then( user => {
			$rootScope.enterUserData = false;
			user.password = value.password;
			Users.update(user);
			$location.path("/login");
		}).catch( err => console.log(err))
	}

	vm.invalidFormValue = function (user){
		if(user == undefined || user.firstName == undefined || user.lastName == undefined || user.email == undefined)
			return true;
		return false;
	}
});
