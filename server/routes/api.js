var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/User.js');
var user_controller = require('../controllers/Users.js')



router.get('/get_users', function(req, res){
  // console.log('this is the api.js file');
  user_controller.index(req, res)
});

router.get('/get_user_by_id/:id', function(req, res){
  console.log('req.body is:', req.params.id)
  user_controller.get_user_by_id(req, res)
});

router.post('/setPic', function(req, res){
  user_controller.setPic(req, res)
});

router.post('/addPic', function(req, res){
  console.log('dropping logs like bombs', req.body)
  user_controller.addPic(req, res)
});

router.post('/updateAboutMe', function(req, res){
  console.log("am I here God?", req.body)
  user_controller.updateAboutMe(req, res)
});

router.post('/removePic', function(req, res){
  console.log('api.js removepic function', req.body)
  user_controller.removePic(req, res)
});

router.post('/sendMessage', function(req, res){
  console.log('sendMessage function in api.js', req.body)
  user_controller.sendMessage(req, res)
});

router.post('/deleteMessage', function(req, res){
  // console.log("deleteMessage message function in api.js", req.body)
  user_controller.deleteMessage(req, res)
});

router.post('/register', function(req, res) {
  console.log("so far so good in api.js", req.body)
  User.register(new User({ username: req.body.username, gender: req.body.gender, birthdate: req.body.birthdate, location: req.body.location, breed: req.body.breed }),
    req.body.password, function(err, account) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        err: err
      });
    } req.session.user_id = account._id
    passport.authenticate('local')(req, res, function (err, user) {
      return res.status(200).json({
        status: 'Registration successful!', account: account
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.session.user_id = user._id;
      console.log(req.session.user_id)
      res.status(200).json({
        status: 'Login successful!', user_id: user._id
      });
    });
  })(req, res, next);
});
// console.log('dropping logs like bombs')

router.get('/logout', function(req, res) {
  req.session.user_id = null;
  req.logout();

  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    console.log()
    return res.status(200).json({
      status: false
    });

  }
  res.status(200).json({
    status: true, user_id: req.session.user_id
  });
});


module.exports = router;
