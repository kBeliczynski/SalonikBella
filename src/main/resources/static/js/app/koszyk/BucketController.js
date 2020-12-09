angular.module('app')
    .controller('BucketController', function($rootScope, Users) {
        var vm = this;
        vm.products = $rootScope.loggedUser.productList;
        vm.perfumes = $rootScope.loggedUser.perfumeList;

        vm.anyInBucket = function(){
            if(undefined == vm.products[0] && undefined == vm.perfumes[0])
                return false;
            else
                return true;
        }

        vm.refresh = function (data) {
            var inputVal = document.getElementById(data.name).value;
            data.amount = inputVal;
        }

        vm.deletePerfume = function (data) {
            vm.user = Users.get($rootScope.loggedUser.id);
            const found = $rootScope.loggedUser.perfumeList.findIndex(element => element.name == data.name);
            $rootScope.loggedUser.perfumeList.splice(found,1);
            vm.user.perfumeList = $rootScope.loggedUser.perfumeList;
            vm.user.productList = $rootScope.loggedUser.productList;
            vm.user.id = $rootScope.loggedUser.id;
            Users.update(vm.user);
        }
        vm.deleteProduct = function (data) {
            vm.user = Users.get($rootScope.loggedUser.id);
            const found = $rootScope.loggedUser.productList.findIndex(element => element.name == data.name);
            $rootScope.loggedUser.productList.splice(found,1);
            vm.user.perfumeList = $rootScope.loggedUser.perfumeList;
            vm.user.productList = $rootScope.loggedUser.productList;
            vm.user.id = $rootScope.loggedUser.id;
            Users.update(vm.user);
        }
    });
