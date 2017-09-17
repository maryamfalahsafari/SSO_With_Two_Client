app.factory('authService',function($http){
    
        var authFactory={};
        authFactory.login = function(loginData){
            return $http.post('/api/authenticate',
                              'grant_type=password&username=' + loginData.username + "&password=" + loginData.password,
                    {"headers":{ "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8" }})
                    .then(function(data){
                        return data;
                    });
        };
        authFactory.decodeToken = function(token){

            return $http.post('/api/decode_token',{ token : token });
        }
        authFactory.checkClient = function(clientId){
            return $http.post('/api/check_client',{ clientId : clientId });
        }
        return authFactory;
    
});

// .factory('authToken',function($window){
//     var authTokenFactory = {};
//     authTokenFactory.setToken = function(token){
//         if (token){
//             $window.localStorage.setItem('token',token);
//         }else{
//             $window.localStorage.removeItem('token');
//         }

//     };
//     authTokenFactory.getToken = function(){
//         return $window.localStorage.getItem('token');
//     };
//     authTokenFactory.setCookie = function(token){
//         $cookies.put('token', token);
//     };
//     authTokenFactory.removeCookie = function(){
//         $cookies.remove('token');
//     };
//     authTokenFactory.getCookie = function(){
//         return $cookies.get('token');
//     };
//     return authTokenFactory;
// });


// .factory('localStorageManager',function($window){
//     var localStorageManagerFactory = {};
//     localStorageManagerFactory.set = function(key,value){
//         if (value){
//             localStorageManagerFactory[key]=value;
//            // $window.localStorage.setItem(key,value);
//         }else{
//             //$window.localStorage.removeItem(key);
//             localStorageManagerFactory[key]=null;
            
//         }

//     };
//     localStorageManagerFactory.get = function(key){
//         //return $window.localStorage.getItem(key);
//         return localStorageManagerFactory[key];
//     };
//     return localStorageManagerFactory;  
// });