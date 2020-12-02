angular.module('app')
.constant('PERFUME_ENDPOINT','/api/perfumes/:id')
.constant('USER_ENDPOINT','/api/users/:id')
.factory('Perfume', function ($resource, PERFUME_ENDPOINT) {
        return $resource(PERFUME_ENDPOINT);
})
.factory('User', function($resource, USER_ENDPOINT) {
    return $resource(USER_ENDPOINT, { id: '@_id' }, {
    update: {
        method: 'PUT'
    }});
})
.service('Perfumes', function ($http, Perfume) {
    this.getAll = params => Perfume.query(params);
    this.get = index => Perfume.get({id: index});
})
.service('Users', function ($http, User) {
    this.get = index => User.get({id: index});
    this.save = user => user.$save();
    this.update = user => alert(user.id);
});
