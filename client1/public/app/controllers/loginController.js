app.controller('loginController',function( $rootScope,$scope,authToken,$location,$window){

    $scope.doLogin = function(){
        if (authToken.getCookie()){
            $window.location = "http://localhost:3000/login?token="+authToken.getCookie()+"&clientId=Application1";
        }else{
            $window.location = "http://localhost:3000/login?clientId=Application1";
        }

    }
});