angular.module('app')
.controller('HaircutListController', function(Haircuts){
    var vm = this;
    vm.haircuts = Haircuts.getAll();
})