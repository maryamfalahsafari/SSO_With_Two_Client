var app = angular.module('userApp',['ngRoute','ngCookies'])
.config(function($routeProvider,$locationProvider){
    
        $routeProvider
        .when('/',{
            templateUrl:'app/views/pages/home.html'
        })
        .when('/login',{
            templateUrl:'app/views/pages/users/login.html',
            controller:'loginController'
        })
        .when('/profile',{
            templateUrl:'app/views/pages/users/profile.html'
        })
        .when('/customLogin/:token',{
            templateUrl:'app/views/pages/users/social/social.html',
            controller:'customLoginController'
        })
        
        .otherwise({redirectTo:'/'});

        $locationProvider.html5Mode({//maryam:important
            enabled: true,
            requireBase: false
        });
})
.config(function($httpProvider){//maryam:important

    $httpProvider.interceptors.push('AuthInterceptors');

});