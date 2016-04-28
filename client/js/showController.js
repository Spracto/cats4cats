angular.module('myApp').controller('showController',
  ['$scope', '$location', 'AuthService', 'UserFactory', '$rootScope', '$routeParams',
  function($scope, $location, AuthService, UserFactory, $rootScope, $routeParams){
    $scope.id = $routeParams.id;
    $scope.profile_photo_array = [];
    $scope.user_profile = [];
    $scope.featured_photo = "";
    // $scope.user_info = [];

    UserFactory.get_user_by_id($scope.id, function(data){
      console.log("controller data is:", data)
      // data.birthdate = moment(data.birthdate).fromNow(true)
      // console.log(data.birthdate)
      $scope.user_profile = data;
      console.log("scope user profile is:", $scope.user_profile)
      angular.forEach($scope.user_profile.other_pics, function(pic){
        console.log("stuff and ",pic)
        $scope.profile_photo_array.push(pic)
      })
    });

    $scope.expandPhoto = function(photo) {
      if($scope.featured_photo == photo){
        $scope.featured_photo = "";
      }else{
        $scope.featured_photo = photo;
      }
    }

    $scope.sendMessage = function(message, user_id){
      console.log("littering and",message, user_id)
      var data = {
        message: message,
        user_id: user_id
      }
      UserFactory.sendMessage(data, function(){
        $scope.message = "";
        // console.log('message sent')
        alert('Message sent');
      })
    }
    // var pagesShown = 1;
    //
    // var pageSize = 4;
    //
    // $scope.paginationLimit = function(data){
    // return pageSize * pagesShown;
    // };
    // $scope.hasMoreItemsToShow = function(){
    // return pagesShown < ($scope.users.length / pageSize);
    // };
    // $scope.showMoreItems = function() {
    // pagesShown = pagesShown +1;
    // };

    // UserFactory.get_users(function(data){
    //   // console.log("traverse this:",data)
    //   for(k in data){
    //     if (data[k]._id == $rootScope.user_id){
    //       $scope.user_info =  data.splice(k, 1)
    //       console.log($scope.user_info)
    //
    //     }
    //   }
    //   $scope.users = data;
    // });

    // $scope.uploadPic = function() {
    //   user = {
    //     user_id: $rootScope.user_id,
    //     pic: $scope.profile.picture
    //   }
    //   $scope.user_info[0].pic_0 = $scope.profile.picture;
    //   UserFactory.setPic(user, function(data){
    //     $scope.profile = {}
    //     // console.log("the response is:", data)
    //   });
    // }
    //
    // $scope.addPics = function() {
    //   user = {
    //     user_id: $rootScope.user_id,
    //     pic: $scope.pictures.pic
    //   }
    //   console.log('addPic function has user as:', user)
    //   UserFactory.addPic(user, function(data){
    //     console.log("that dater do:", data)
    //     $scope.pictures = {};
    //   })
    // }

    // UserFactory.index(function(data){
    //   $scope.users = data;
    // });


}])
