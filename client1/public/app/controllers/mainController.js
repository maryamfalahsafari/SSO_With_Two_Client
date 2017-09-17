app.controller('mainController',function($scope,authService,$location,$rootScope,$window){

    // $cookies.put('name', 'maryam');
    // alert($cookies.get('name'));

    $rootScope.$on('$routeChangeStart',function(){
        if (authService.isLoggedIn()){
            authService.getUser().then(function(data){
                $scope.user = {username : data.data.username , email : data.data.email};
               // authService.setCookie(authService.getto);

            });
        }else{
            console.log('User is not logged in.');
            $scope.user = {};
        }
        if ($location.hash() == '_=_') $location.hash(null);
    });

  
    $scope.logout = function(){
        authService.logout();
        $location.path('/login');
        $scope.user = {};
    }


});