var myApp = angular.module('myApp', ['ngRoute', 'angularMoment']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
      templateUrl: 'partials/home.html',
      controller: 'homeController',
      // resolve: {
      //   function(AuthService){
      //     if(AuthService.isLoggedIn()){
      //       console.log('you are logged in bud')
      //     }
      //     else {
      //       redirectTo:"/login";
      //       alert("please log in first")
      //       access: {restricted: true}
      //     }
      //   }
      // }
      access: {restricted: true}
    })
    // .when('/user/:id', {
    //   templateUrl: 'partials/show.html',
    //   controller: 'showController',
    //   access: {restricted: true}
    // })
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
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({
      redirectTo: '/'
    });
});

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

myApp.filter('capitalize', function(){
  return function(input){
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : "";
  }
})
