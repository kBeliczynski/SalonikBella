angular.module('app')
.config(function ($routeProvider) {
    $routeProvider
        .when('/start', {
            templateUrl: 'js/app/start/start.html'
           // controller: 'UserListController',
           // controllerAs: 'ctrl'
        })
        .when('/kontakt', {
            templateUrl: 'js/app/kontakt/kontakt.html'
           // controller: 'UserListController',
           // controllerAs: 'ctrl'
        })
        .when('/cennik', {
            templateUrl: 'js/app/cennik/HaircutList.html',
            controller: 'HaircutListController',
            controllerAs: 'Ctrl'
        })
        .when('/perfumy', {
            templateUrl: 'js/app/perfumy/Perfume.html',
         //   controller: 'HaircutListController',
         //   controllerAs: 'Ctrl'
        })
        .otherwise({
            redirectTo: '/start'
        });
});
