angular.module('app')
    .constant('VISIT_ENDPOINT','/api/visits/:id')
    .factory('Visit', function ($resource, VISIT_ENDPOINT) {
        return $resource(VISIT_ENDPOINT);
    })
    .service('VisitService', function (Visit) {
        this.getAll = params => {Visit.query(params); console.log(params);};
        this.get = index => Visit.get({id: index});
    });
