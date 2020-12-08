angular.module('app')
    .controller('BucketController', function($rootScope, $location) {
        var vm = this;
        vm.products = $rootScope.loggedUser.productList;
        vm.perfumes = $rootScope.loggedUser.perfumeList;

        vm.anyInBucket = function(){
            if(vm.products[0] === undefined && vm.perfumes[0] === undefined)
                return false;
            else
                return true;
        }

    });
