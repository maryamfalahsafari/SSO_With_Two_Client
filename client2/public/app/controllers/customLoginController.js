app.controller('customLoginController',function($scope,authService,$routeParams,$location){
    //console.log('maryam',$routeParams.token);
    authService.setCookie($routeParams.token);
    $location.path('/');
});