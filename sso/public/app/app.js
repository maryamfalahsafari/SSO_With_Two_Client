var app = angular.module('userApp',['ngRoute'])
.config(function($routeProvider,$locationProvider){
    
        $routeProvider
        .when('/register',{
            templateUrl:'app/views/pages/users/register.html',
            controller:'regController'
        })
        .when('/login',{
            templateUrl:'app/views/pages/users/login.html',
            controller:'loginController'
        })
        .when('/social/:type/:token/:clientId',{
            templateUrl:'app/views/pages/users/social/social.html',
            controller:'socialController'
        })
        
        .otherwise({redirectTo:'/login'});

        $locationProvider.html5Mode({//maryam:important
            enabled: true,
            requireBase: false
        });
});