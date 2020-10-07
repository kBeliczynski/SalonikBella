angular.module('app')
.constant('CATEGORY_ENDPOINT','/api/categories/:id')
.factory('Category', function ($resource, CATEGORY_ENDPOINT) {
    return $resource(CATEGORY_ENDPOINT);
})
.service('Categories', function (Category) {
    this.getAll = function () {
        return Category.query();
    }
    this.get = function (index) {
        return Category.get({id: index});
    }
});
