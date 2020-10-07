angular.module('app')
.constant('PRODUCT_ENDPOINT','api/products/:id')
.factory('Product',function ($resource, PRODUCT_ENDPOINT) {
    return $resource(PRODUCT_ENDPOINT);
})
.service('Products', function (Product) {
    this.getAll = params => Product.query(params);
});