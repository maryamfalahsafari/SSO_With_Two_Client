app.controller('socialController',function($scope,authService,$routeParams,$location,$window){
    //if ($location.hash() == '_=_') $location.hash(null);
    console.log( $routeParams.token);
    authService.checkClient($routeParams.clientId).then(function(data){
        if (data.data.success == true){
            $window.location = data.data.client.callback  + '/customLogin/' + $routeParams.token;
        }        
    });//clientId
    


    // authService.decodeToken($routeParams.token).then(function(data){
    //     if (data.data.success == true){
    //         console.log(data.data.info.callback  + '/customLogin/' + $routeParams.token);
    //         console.log(data.data.info.callback);
            
    //         if (data.data.info.callback){
    //             $window.location = data.data.info.callback  + '/customLogin/' + $routeParams.token;
            
    //         }
    //     }
    //     console.log(data);
    // });
    

});