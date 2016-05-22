angular.module('myApp')
.controller('messageController', [
  '$scope',
  '$location',
  'AuthService',
  'UserFactory', '$rootScope', '$location',
  function($scope, $location, AuthService, UserFactory, $rootScope, $location){
    $scope.users = [];
    $scope.user_info = [];
    $scope.user_info_photos = [];
    $scope.user_messages = [];
    $scope.replyinfo = {};
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

    $scope.replyToMessage = function(message){
      // below is one way to do this:
      // if(message.reply == true){
      //   message.reply = false;
      // } else {
      //   message.reply = true;
      // }
      // but below here is a better way to do that
      message.reply = !message.reply;
    }

    $scope.deleteMessage = function(index, message , message_id){
      console.log(index, message)
      UserFactory.deleteMessage(message_id, function(){
        $scope.user_messages.splice($scope.user_messages.indexOf(message), 1)
      })
      // console.log(message)
    }

    UserFactory.getUsers(function(data){
      // console.log("traverse this:",data)
      for(var k=0; k<data.length; k++){
        if (data[k]._id == $rootScope.user_id){
          $scope.user_info = data.splice(k, 1);
        }
      }
      // console.log($scope.user_info)
      for(var j=0; j<data.length; j++){
        for (i in $scope.user_info[0].messages){
          // console.log($scope.user_info[0].messages[i])
          if($scope.user_info[0].messages[i].from == data[j]._id){
            // console.log("does this:", $scope.user_info[0].messages[i].from, "equal this?", data[k]._id)
            $scope.user_messages.push({inbox: {_id: $scope.user_info[0].messages[i]._id, from_id: data[j]._id ,img: data[j].pic_0, from: data[j].username, message: $scope.user_info[0].messages[i].message}});
            // $scope.user_messages.push()
            // $scope.user_messages.push($scope.user_info[0].messages[i])
          }
        }
      }
      // console.log($scope.user_messages)
      $scope.users = data;
    });

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
      UserFactory.removePic(photo, function(){
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

    $scope.sendMessage = function(message, user_id, form){
      // console.log("littering and",message, user_id)
      // form.reply = false just removes the input form once the user has clicked send
      form.reply = false;
      var data = {
        message: $scope.replyinfo.message,
        user_id: user_id
      }
      $scope.replyinfo = {};
      UserFactory.sendMessage(data, function(){
        alert('message sent');
      })
    }
}])

// Some or none of this may come in handy later
// UserFactory.getUserById(function(data){
//   $scope.user_info = data;
// });



// UserFactory.index(function(data){
//   $scope.users = data;
// });

// angular.forEach($scope.user_info.other_pics, function(pic){
//   console.log("stuff and ",pic)
//   $scope.user_info_photos.push(pic)
// })
