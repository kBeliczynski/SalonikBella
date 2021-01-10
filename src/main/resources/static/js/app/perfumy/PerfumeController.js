angular.module('app')
.controller('PerfumeListController', ['Perfumes', function (Perfumes) {
    var vm = this;
    vm.perfumes = Perfumes.getAll();

    vm.search = name => {
        vm.perfumes = Perfumes.getAll({name});
    }

    vm.searchByGender = gender => {
        vm.perfumes = Perfumes.getAll({gender});
    }

    vm.searchByVolume = volume => {
        vm.perfumes = Perfumes.getAll({volume});
    }

    vm.anyPerfumes = function(){
        return vm.perfumes[0];
    }

}])
.controller('PerfumeDetailsController', function ($resource, $rootScope, $routeParams, Perfumes , Users) {
    var vm = this;
    var perfumeIndex = $routeParams.id;
    vm.duplicate = false;
    vm.perfume = Perfumes.get(perfumeIndex);

    vm.addPerfumeToBucket = function (perfume) {
        Users.get($rootScope.loggedUser.id).$promise.then( user => {
            if(!vm.checkDuplicatePerfumeInBucket(perfume)) {
                $rootScope.loggedUser.perfumeList.push(perfume);
                user.perfumeList = $rootScope.loggedUser.perfumeList;
                Users.update(user);
            }
        }).catch( err => console.log( err ))

    }

    vm.checkDuplicatePerfumeInBucket = function ( perfume ) {
        ($rootScope.loggedUser.perfumeList.forEach( (element) => {
            if(element.name === perfume.name) vm.duplicate = true;
        }));
        return vm.duplicate;
    }

});
