angular.module('myApp').controller('homeController',
  ['$scope', '$location', 'AuthService', 'UserFactory', '$rootScope', '$location',
  function($scope, $location, AuthService, UserFactory, $rootScope, $location){
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
          // console.log("scope dot user info of 0 dot other pics",$scope.user_info[0].other_pics)
          angular.forEach($scope.user_info[0].other_pics, function(pic){
            // console.log("littering and...",pic)
            $scope.user_info_photos.push(pic)
          })
        }
      }
      $scope.users = shuffleArray(data);
    });

    // -> Fisher–Yates shuffle algorithm
    var shuffleArray = function(array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }



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
        pic: $scope.pictures.pics
      }
      // console.log('addPic function has user as:', user)
      UserFactory.addPic(user, function(data){
        // console.log("that dater do:", data)
        $scope.user_info_photos.push(user.pic)
        $scope.pictures = {};
      })
    }

    $scope.removePic = function(photo) {
      console.log("step 1", photo)
      UserFactory.removePic({photo}, function(){
        console.log("step 3", photo)
        $scope.user_info_photos.splice($scope.user_info_photos.indexOf(photo), 1)
        // console.log('success')
      })
    }

    $scope.updateAboutMe = function() {
      // console.log('DEADMAU5!, also this:', $scope.profile.about_me)
      update = {info: $scope.profile.about_me}
      // $scope.user_info.about_me = $scope.profile.about_me;
      UserFactory.updateAboutMe(update, function(){
        $scope.user_info[0].about_me = $scope.profile.about_me;
        // console.log('if I"m getting here then what is up', $scope.user_info.about_me, $scope.profile.about_me)
        $scope.profile = {}
      })
    }

    $scope.viewProfile = function(user) {
      console.log($rootScope.loggedIn, user._id);
      if($rootScope.loggedIn == true){
        $location.path('/one/'+user._id)
      } else {
        alert('Please login or register to view profiles');
      }
    }



    // UserFactory.get_user_by_id(function(data){
    //   $scope.user_info = data;
    // });



    // UserFactory.index(function(data){
    //   $scope.users = data;
    // });


}])
