angular.module('app')
.controller('PerfumeListController', ['Perfumes', function (Perfumes) {
    var vm = this;
    vm.perfumes = Perfumes.getAll();
}]);