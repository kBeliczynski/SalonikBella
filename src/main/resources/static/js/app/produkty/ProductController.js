angular.module('app')
.controller('ProductController', ['Products', function () {
    var vm = this;
    vm.products = Products.getAll();
}])