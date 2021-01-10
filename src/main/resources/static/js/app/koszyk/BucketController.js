angular.module('app')
    .controller('BucketController', function($rootScope, Users) {
        var vm = this;
        vm.products = $rootScope.loggedUser.productList;
        vm.perfumes = $rootScope.loggedUser.perfumeList;

        vm.checkSummary = function() {
            var sum = 0;
            vm.perfumes.forEach( (element) => {
                sum += element.amount*element.price;
            })
            vm.products.forEach( (element) => {
                sum += element.amount*element.price;
            })
            return sum;
        }

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
            Users.get($rootScope.loggedUser.id).$promise.then( user => {
                const found = $rootScope.loggedUser.perfumeList.findIndex(element => element.name == data.name);
                $rootScope.loggedUser.perfumeList.splice(found,1);
                user.perfumeList = $rootScope.loggedUser.perfumeList;
                Users.update(user);
            }).catch( err => console.log( err ))
        }

        vm.deleteProduct = function (data) {
            Users.get($rootScope.loggedUser.id).$promise.then( user => {
                const found = $rootScope.loggedUser.productList.findIndex(element => element.name == data.name);
                $rootScope.loggedUser.productList.splice(found,1);
                user.productList = $rootScope.loggedUser.productList;
                Users.update(user);
            }).catch( err => console.log( err ))
        }

    });
