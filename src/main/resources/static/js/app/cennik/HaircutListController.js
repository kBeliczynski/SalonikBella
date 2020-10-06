angular.module('app')
.controller('HaircutListController', ['Haircuts', function(Haircuts){
    var vm = this;
    vm.haircuts = Haircuts.getAll();

}]);

