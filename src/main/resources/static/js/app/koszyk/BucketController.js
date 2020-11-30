angular.module('app')
    .controller('BucketController', function($rootScope, $location) {
        var vm = this;
        vm.products = $rootScope.loggedUser.productList;
        vm.perfumes = $rootScope.loggedUser.perfumeList;

        vm.anyInBucket = function(){
            return vm.products[0] && vm.perfumes[0];
        }

    });
