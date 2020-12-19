angular.module('app')
.constant('LOGIN_ENDPOINT', '/login')
.service('LoginService', function($http, $rootScope, LOGIN_ENDPOINT) {
 	this.authenticate = function(credentials, successCallback) {
 		var authHeader = {Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)};
 		var config = {headers: authHeader};
 		$http
 		.post(LOGIN_ENDPOINT, {}, config)
 		.then(function success(value)	{ // otrzymuje obiekt User z endpointu /login
 			$http.defaults.headers.post.Authorization = authHeader.Authorization;
			$rootScope.loginError = false;
 			successCallback(value.data);
 		}, function error(reason) {
 			console.log('Login error');
 			$rootScope.loginError = true;
 			//console.log(reason);
 		});
 	}
 	this.logout = function(successCallback) {
		delete $http.defaults.headers.post.Authorization;
		successCallback();
 	}
 })
