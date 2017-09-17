app.factory('userService',function($http){

    var userFactory={};
    userFactory.createUser = function(regData){
        return $http.post('/api/users',regData);
    }
    return userFactory;

});
