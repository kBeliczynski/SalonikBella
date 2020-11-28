angular.module('app')
.config(function ($routeProvider,  $locationProvider, $httpProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $routeProvider
        .when('/start', {
            templateUrl: 'js/app/start/start.html',
            controller: 'StartController',
            controllerAs: 'Ctrl'
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
            controller: 'PerfumeListController',
            controllerAs: 'Ctrl'
        })
        .when('/perfumy/:id', {
            templateUrl: 'js/app/perfumy/PerfumeDetails.html',
            controller: 'PerfumeDetailsController',
            controllerAs: 'Ctrl'
        })
        .when('/produkty/:category', {
            templateUrl: 'js/app/produkty/Product.html',
            controller: 'ProductController',
            controllerAs: 'Ctrl'
        })
        .when('/produkty/:category/:id', {
            templateUrl: 'js/app/produkty/ProductDetails.html',
            controller: 'ProductDetailsController',
            controllerAs: 'Ctrl'
        })
        .when('/produkty', {
            templateUrl: 'js/app/produkty/CategoryList.html',
            controller: 'CategoryListController',
            controllerAs: 'Ctrl'
        })
        .when('/wizyty', {
            templateUrl: 'js/app/wizyty/Visits.html',
            controller: 'VisitsController',
            controllerAs: 'Ctrl'
        })
        .when('/login', {
 	        templateUrl: 'js/app/logowanie/login.html',
 	        controller: 'LoginController',
 	        controllerAs: 'Ctrl'
        })
        .otherwise({
            redirectTo: '/start'
        });
});
