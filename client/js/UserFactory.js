angular.module('myApp').factory('UserFactory',
  function ($http, $rootScope){
  var factory = {};
  var users = [];
  var user = [];

  factory.get_users = function(callback){
    $http.get('/user/get_users').success(function(output){
      // console.log('this is a wild thing to try.', req.session.user_id)
      users = output;
      callback(users);
    });
    // console.log('factory index function has started');
    // $http.get('/users').success(function(output){
    //   console.log("in the user factory I have output as:",output)
    //   users = output;
    //   callback(users);
    // });
  }

  factory.get_user_by_id = function(data, callback){
    console.log("made it to the userfactory.js data is:", data )
    $http.get('/user/get_user_by_id/'+ data ).success(function(output){
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
    })
  }

  factory.addPic = function(pic, callback){
    $http.post('/user/addPic', pic).success(function(response){
      console.log('userfactory.js here, response is:', response)
      callback(response)
    })
  }

  return factory;
});
