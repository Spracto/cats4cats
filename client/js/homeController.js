angular.module('myApp').controller('homeController',
  ['$scope', '$location', 'UserFactory',
  function($scope, $location, UserFactory){
    $scope.users = [];

    UserFactory.index(function(data){
      $scope.users = data;
    });
    

}])
