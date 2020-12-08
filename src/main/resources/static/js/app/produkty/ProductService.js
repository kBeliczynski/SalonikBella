angular.module('app')
.constant('CATEGORY_ENDPOINT','/api/categories/:id')
.constant('PRODUCT_ENDPOINT','api/products/:category/:id')
.constant('USER_ENDPOINT','/api/users/:id')
.factory('Category', function ($resource, CATEGORY_ENDPOINT) {
    return $resource(CATEGORY_ENDPOINT);
})
.factory('Product',function ($resource, PRODUCT_ENDPOINT) {
    return $resource(PRODUCT_ENDPOINT);
})
.factory('User', function($resource, USER_ENDPOINT) {
    return $resource(USER_ENDPOINT, { id: '@_id' }, {
    update: {
        method: 'PUT'
    }});
})
.service('Categories', function (Category) {
    this.getAll = function () {
        return Category.query();
    }
    this.get = function (index) {
        return Category.get({id: index});
    }
})
.service('Products', function (Product) {
    this.getAll = params => Product.query(params);
    this.getAll = params => Product.query({category: params});
    this.get = index => Product.get({id: index});
})
.service('Users', function ($http, User) {
    this.get = index => User.get({id: index});
    this.save = user => user.$save();
    this.update = user => user.$update({id : user.id});
});
