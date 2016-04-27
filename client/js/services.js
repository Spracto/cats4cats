angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$rootScope',
  function ($q, $timeout, $http, $rootScope) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          // console.log("the services.js getUserStatus function data variable is:", data)
          $rootScope.user_id = data.user_id
          $rootScope.loggedIn = true;
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          // console.log("services data is:", data, "the status is :", status)
          //i have modified data to respond with the id of the user for
          //the purpose of trying tracking the user across the site
          if(status === 200 && data.status){
            // console.log(req.session.user_id)
            $rootScope.user_id = data.user_id
            $rootScope.loggedIn = true;
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          $rootScope.loggedIn = false;
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(user_info) {
      console.log("in the service function", user_info)

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        user_info)
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            console.log("the console log you want IS RIGHT HERE", data.account._id);
            $rootScope.user_id = data.account._id;
            $rootScope.loggedIn = true;
            // user = true
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }


}]);
