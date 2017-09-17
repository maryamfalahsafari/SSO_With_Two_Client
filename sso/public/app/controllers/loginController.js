app.controller('loginController',function($scope,authService,$routeParams,$window){

    $scope.client = null;
    if ($routeParams.clientId){
        authService.checkClient($routeParams.clientId).then(function(data){
            $scope.client = data.data.client;
            $scope.$emit('update_parent_controller', $scope.client.clientId);
        });
    }

    $scope.doLogin = function(){
        authService.login($scope.loginData).then(function(data){
            if (data.data.success==true){
                $window.location = $scope.client.callback  + '/customLogin/' + data.data.token;
            }else{
                alert('Invalid username or password');
            }
        });
    }
    $scope.socialLogin = function(socialType){
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/' + socialType +
                 "?queryParams=" + $routeParams.clientId;
    }

});