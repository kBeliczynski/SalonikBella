angular.module('app')
.constant('PICTURE_ENDPOINT','/api/pictures/:id')
.factory('Picture', function ($resource, PICTURE_ENDPOINT) {
        return $resource(PICTURE_ENDPOINT);
})
.service('Pictures', function (Picture) {
    this.getAll = params => Picture.query(params);
});