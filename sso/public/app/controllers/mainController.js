app.controller('mainController',function($scope,authService,$window){
   
    $scope.$on("update_parent_controller", function(event, message){
        $scope.clientId = message;
    });

});