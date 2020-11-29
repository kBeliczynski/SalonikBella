angular.module('app')
.controller('RegistrationController', function(Users, $location, $rootScope, FlashService) {
    var vm = this;

    this.register = function() {
        vm.dataLoading = true;
        Users.Create(vm.user)
            .then(function (response) {
                if (response.success) {
                    alert("udało się");
                    FlashService.Success('Registration successful', true);
                    $location.path('/zarejestrowano');
                } else {
                    alert("nie udało się");
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
    }

    // .controller('RegistrationController', function(Users, User) {
    //     var vm = this;
    //     vm.user = new User();
    //     vm.register = function() {
    //         vm.user.role = 1;
    //         vm.user.productList = [];
    //         vm.user.perfumeList = [];
    //         Users.add(vm.user);
    //         vm.user = new User();
    //     }
    //}
});
