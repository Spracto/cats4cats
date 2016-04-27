angular.module('myApp').controller('homeController',
  ['$scope', '$location', 'AuthService', 'UserFactory', '$rootScope',
  function($scope, $location, AuthService, UserFactory, $rootScope){
    $scope.users = [];
    $scope.user_info = [];
    $scope.user_info_photos = [];

    var pagesShown = 1;

    var pageSize = 4;

    $scope.paginationLimit = function(data){
    return pageSize * pagesShown;
    };
    $scope.hasMoreItemsToShow = function(){
    return pagesShown < ($scope.users.length / pageSize);
    };
    $scope.showMoreItems = function() {
    pagesShown = pagesShown +1;
    };

    UserFactory.get_users(function(data){
      // console.log("traverse this:",data)
      for(k in data){
        if (data[k]._id == $rootScope.user_id){
          $scope.user_info = data.splice(k, 1);
          console.log($scope.user_info[0].other_pics)
          angular.forEach($scope.user_info[0].other_pics, function(pic){
            console.log("littering and...",pic)
            $scope.user_info_photos.push(pic)
          })
        }
      }
      $scope.users = data;
    });

    // angular.forEach($scope.user_info.other_pics, function(pic){
    //   console.log("stuff and ",pic)
    //   $scope.user_info_photos.push(pic)
    // })

    $scope.uploadPic = function() {
      user = {
        user_id: $rootScope.user_id,
        pic: $scope.profile.picture
      }
      $scope.user_info[0].pic_0 = $scope.profile.picture;
      UserFactory.setPic(user, function(data){
        $scope.profile = {}
        // console.log("the response is:", data)
      });
    }

    $scope.addPics = function() {
      user = {
        user_id: $rootScope.user_id,
        pic: $scope.pictures.pic
      }
      console.log('addPic function has user as:', user)
      UserFactory.addPic(user, function(data){
        console.log("that dater do:", data)
        $scope.pictures = {};
      })
    }



    // UserFactory.get_user_by_id(function(data){
    //   $scope.user_info = data;
    // });



    // UserFactory.index(function(data){
    //   $scope.users = data;
    // });


}])
