app.controller('regController',function($scope,userService){

    $scope.regUser = function(){

        userService.createUser($scope.regData).then(function(data){
           alert(data.data.message);
        });

    }

   
});

