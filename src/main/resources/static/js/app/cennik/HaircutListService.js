angular.module('app')
.constant('HAIRCUT_ENDPOINT','/api/haircuts/:id')
.factory('Haircut', function ($resource, HAIRCUT_ENDPOINT) {
    return $resource(HAIRCUT_ENDPOINT);
})
.service('Haircuts', function (Haircut) {
    this.getAll = function () {
        return Haircut.query();
    }
    this.get = function (index) {
        return Haircut.get({id: index});
    }
})
