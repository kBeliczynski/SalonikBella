angular.module('app')
.constant('PERFUME_ENDPOINT','/api/perfumes/:id')
.factory('Perfume', function ($resource, PERFUME_ENDPOINT) {
        return $resource(PERFUME_ENDPOINT);
})
.service('Perfumes', function (Perfume) {
    this.getAll = params => Perfume.query(params);
    this.get = index => Perfume.get({id: index});

});