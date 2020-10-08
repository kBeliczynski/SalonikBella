
angular.module('app')
.controller('CategoryListController', ['Categories', function(Categories){
    var vm = this;
    vm.categories = Categories.getAll();
}])
.controller('ProductController', function ($routeParams, $resource, Products) {
    var vm = this;
    var productCategory = $routeParams.category;
    var Product = $resource('api/products/'+productCategory);

    vm.products = Product.query(
        function success(data, headers) {
            console.log('Pobrano dane: ' + data + ' z api pod adresem :' + 'api/products/'+productCategory);
 			console.log(headers('Content-Type'));
 			},
 		function error(response) {
 			console.log(response.status); //np. 404
     });

})
.controller('ProducDetailsController', function ($routeParams, Perfumes ) {
    var vm = this;
    var productIndex = $routeParams.id;
    vm.perfume = Perfumes.get(perfumeIndex);
});