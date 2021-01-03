angular.module('app')
    .constant('VISIT_ENDPOINT','/api/visits/:id')
    .factory('Visit', function ($resource, VISIT_ENDPOINT) {
        return $resource(VISIT_ENDPOINT, { id: '@_id' }, {
            delete: {
                method: 'DELETE'
            },
            update: {
                method: 'PUT'
            }});
    })
    .service('Visits', function ($http, Visit) {
        this.getAll = params => Visit.query(params);
        this.get = index => Visit.get({id: index});
        this.delete = visit => visit.$delete({id: visit.id});
        this.update = visit => visit.$update({id: visit.id});
    });
