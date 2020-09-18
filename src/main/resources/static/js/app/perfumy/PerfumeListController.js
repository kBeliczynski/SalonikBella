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
}]);