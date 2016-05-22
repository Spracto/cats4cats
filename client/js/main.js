var myApp = angular.module('myApp', ['ngRoute', 'angularMoment']);

myApp.config(function ($routeProvider) {
  $routeProvider
  //access is a variable that will get set by passport upon login/registration
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'homeController',
      access: {restricted: true}
    })
    //currently the only thing that informs the user that they have to log in is a javascript alert,
    //perhaps this could be a modal in the future?
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/one/:id', {
      templateUrl: 'partials/show.html',
      controller: 'showController',
      access: {restricted: true}
    })
    .when('/two', {
      templateUrl: 'partials/browse.html',
      controller: 'homeController',
      access: {restricted: false}
    })
    .when('/messages',{
      templateUrl: 'partials/messages.html',
      controller: 'messageController',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

// Part of this myApp.run is the fallback for tracking our loggedIn user
// should the page get reloaded.
myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
//these two functions were added in to help keep things looking clean. 
myApp.filter('capitalize', function(){
  return function(input){
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : "";
  }
})

myApp.filter('reverse', function(){
  return function(items){
    return items.slice().reverse();
  };
});
