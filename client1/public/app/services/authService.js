app.factory('authService',function($http,authToken){
    
        var baseUrl = 'http://localhost:3000';    
        var authFactory={};
        authFactory.isLoggedIn = function(){
            if (authToken.getCookie()){
                return true;
            }else{
                return false;
            }
        };
        authFactory.getUser = function(){
            if (authToken.getCookie()){
                return $http.post(baseUrl+'/api/me');
            }else{
                $q.reject({message : 'User has no token'});
            }
        };
        authFactory.logout = function(){
            authToken.removeCookie();
        };
        authFactory.setCookie = function(token){
            authToken.setCookie(token);
        };
        return authFactory;
})

.factory('authToken',function($cookies){
    var authTokenFactory = {};
    authTokenFactory.setCookie = function(token){
        $cookies.put('token', token);
    };
    authTokenFactory.removeCookie = function(){
        $cookies.remove('token');
    };
    authTokenFactory.getCookie = function(){
        return $cookies.get('token');
    };
    return authTokenFactory;
})


.factory('AuthInterceptors',function($q,authToken){
    var authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config){
        config.headers = config.headers || {};
        var token = authToken.getCookie();
        config.headers.Authorization = 'Bearer ' + token;
        //config.headers['x-access-token'] = token;
        return config;
    };
    authInterceptorsFactory.response = function(response){
        return response || $q.when(response);
    };
    authInterceptorsFactory.responseError = function(rejection){
        if (rejection.status === 401) {
            authToken.removeCookie();
        }
        return $q.reject(rejection);
    };





    return authInterceptorsFactory;
});
    