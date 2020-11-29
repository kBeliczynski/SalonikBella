angular.module('app')
    .constant('USER_ENDPOINT', '/api/users')
    .factory('User', function($resource, USER_ENDPOINT) {
        return $resource(USER_ENDPOINT);
    })
    .service('Users', function($http, User) {

        this.Create = function(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

    });
