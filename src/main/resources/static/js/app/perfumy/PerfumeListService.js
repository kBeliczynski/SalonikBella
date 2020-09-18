angular.module('app')
.constant('PERFUME_ENDPOINT','/api/perfumes/:id')
.factory('Perfume', function ($resource, PERFUME_ENDPOINT) {
        return $resource(PERFUME_ENDPOINT);
})
.service('Perfumes', function (Perfume) {
    this.getAll = function () {
        return Perfume.query();
    }
    this.get = function (index) {
        return Perfume.get({id: index});
    }
});