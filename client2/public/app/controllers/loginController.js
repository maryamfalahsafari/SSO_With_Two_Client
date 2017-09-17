app.controller('loginController',function( $rootScope,$scope,authToken,$location,$window){

    $scope.doLogin = function(){
        if (authToken.getCookie()){
            $window.location = "http://localhost:3000/login?token="+authToken.getCookie()+"&clientId=Application2";
        }else{
            $window.location = "http://localhost:3000/login?clientId=Application2";
        }

    }
    // $scope.facebook = function(){
    //     $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook'
    // }
    // $scope.twitter = function(){
    //     $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter'
    // }
    // $scope.google = function(){
    //     $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google'
    // }

});