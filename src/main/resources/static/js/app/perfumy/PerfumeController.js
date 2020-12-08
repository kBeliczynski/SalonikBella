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
    vm.perfume = Perfumes.get(perfumeIndex);

    vm.addPerfumeToBucket = function () {
        vm.user = Users.get($rootScope.loggedUser.id);
        $rootScope.loggedUser.perfumeList.push(vm.perfume);
        vm.user.perfumeList = $rootScope.loggedUser.perfumeList;
        vm.user.productList = $rootScope.loggedUser.productList;
        vm.user.id = $rootScope.loggedUser.id;
        console.log(vm.user);
        Users.update(vm.user);
    }
});
