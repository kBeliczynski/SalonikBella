angular.module('app')
.controller('StartController', ['Pictures', function(Pictures){
    var vm = this;
    vm.pictures = Pictures.getAll();
}]);