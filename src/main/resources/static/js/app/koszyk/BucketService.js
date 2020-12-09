angular.module('app')
.constant('USER_ENDPOINT','/api/users/:id')
.factory('User', function($resource, USER_ENDPOINT) {
    return $resource(USER_ENDPOINT, { id: '@_id' }, {
    update: {
        method: 'PUT'
    }});
})
.service('Users', function ($http, User) {
    this.get = index => User.get({id: index});
    this.update = user => user.$update({id : user.id});
});
