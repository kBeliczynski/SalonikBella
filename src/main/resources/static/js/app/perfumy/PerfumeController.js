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
.controller('PerfumeDetailsController', function ($routeParams, Perfumes ) {
    var vm = this;
    var perfumeIndex = $routeParams.id;
    vm.perfume = Perfumes.get(perfumeIndex);
});