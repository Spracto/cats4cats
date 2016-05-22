angular.module('myApp')
.factory('UserFactory',
  function ($http, $rootScope){
  var factory = {};
  var users = [];
  var user = [];


  factory.getUsers = function(callback){
    $http.get('/user/getUsers').success(function(output){
      users = output;
      callback(users);
    });
  }

  factory.deleteMessage = function(_id, callback){
    $http.post('/user/deleteMessage', {_id}).success(function(output){
      callback(output)
    })
  }

  factory.getUserById = function(data, callback){
    console.log("made it to the userfactory.js data is:", data )
    $http.get('/user/getUserById/'+ data ).success(function(output){
      console.log("userfactory.js here, the controller sent this back", output)
      user = output;
      callback(user)
    });
  }

  factory.setPic = function(user_data, callback){
    // console.log("factory setPic function has this for user_data:", user_data);
    $http.post('/user/setPic', user_data).success(function(response){
      // console.log('userfactory.js:', response)
      callback(users)
    });
  }

  factory.addPic = function(pic, callback){
    $http.post('/user/addPic', pic).success(function(response){
      callback(response);
    });
  }

  factory.removePic = function(pic, callback){
    console.log('step 2', pic)
    $http.post('/user/removePic', pic).success(function(response){
      console.log('step 4', response)
      callback(response);
    });
  }

  factory.updateAboutMe = function(info, callback){
    console.log("Am I breaking here?",info)
    $http.post('/user/updateAboutMe', info).success(function(response){
      console.log('updateAboutMe', info)
      callback(response);
    });
  }

  factory.sendMessage = function(data, callback){
    console.log('the data for the project', data)
    $http.post('/user/sendMessage', data).success(function(response){
      console.log('sendMessage', response)
      callback(response)
    });
  }

  return factory;
});
