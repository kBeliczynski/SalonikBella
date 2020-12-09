angular.module('app')
.controller('CategoryListController', ['Categories', function(Categories){
    var vm = this;
    vm.categories = Categories.getAll();
}])
.controller('ProductController', function ($routeParams, $resource, Products) {
    var vm = this;
    vm.productCategory = $routeParams.category;
    var Product = $resource('api/products/'+vm.productCategory);

    vm.products = Product.query(
        function success(data, headers) {
            // console.log('Pobrano dane: ' + data + ' z api pod adresem :' + 'api/products/'+vm.productCategory);
 			console.log(headers('Content-Type'));
 			},
 		function error(response) {
 			console.log(response.status); //np. 404
     });

    vm.anyProducts = function(){
        return vm.products[0];
    }

})
.controller('ProductDetailsController', function ($resource, $routeParams, $rootScope, Products , Users) {
    var vm = this;
    vm.productIndex = $routeParams.id;
    vm.productCategory = $routeParams.category;
    var Product = $resource('api/products/'+vm.productCategory+'/'+vm.productIndex);


    vm.product = Product.get(vm.productIndex,
        function success(data, headers) {
            // console.log('Pobrano dane: ' + data + ' z api pod adresem :' + 'api/products/' + vm.productCategory);
 			console.log(headers('Content-Type'));
 			},
 		function error(response) {
 			console.log(response.status); //np. 404
     });

    vm.addProductToBucket = function () {
        vm.user = Users.get($rootScope.loggedUser.id);
        $rootScope.loggedUser.productList.push(vm.product);
        vm.user.perfumeList = $rootScope.loggedUser.perfumeList;
        vm.user.productList = $rootScope.loggedUser.productList;
        vm.user.id = $rootScope.loggedUser.id;
        Users.update(vm.user);
    }
});
