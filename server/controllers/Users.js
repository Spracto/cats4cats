var mongoose = require('mongoose');
var user = mongoose.model('User');
var moment = require('moment');

module.exports = {
  index: function(req, res){
    user.find({}, function(err, users){
      if(err){
        console.log('errors', err)
      } else {
        res.json(users)
      }
    })
  },
  setPic: function(req, res){
    console.log("this is users.js req.body: ",req.body)
    user.update({_id: req.body.user_id}, {pic_0: req.body.pic}, function(err, user){
      if(err){
        console.log("errors setting pic:", err)
      }
      console.log('made it!')
      res.json(user)
    })
  },
  addPic: function(req, res){
    console.log('USers.js here, your req.body is:', req.body)
    user.findByIdAndUpdate(req.body.user_id, {$push: {"other_pics": req.body.pic}},
    {safe: true, upsert: true, new: true},
    function(err, model){
      if(err){
        console.log("Errors:",err)
      } else {
        res.json({status: "success"})
      }
    })
    // user.findByIdAndUpdate()
  },
  get_user_by_id: function(req, res){
    console.log("user.js controller here:", req.params)
    user.findOne({_id: req.params.id}, function(err, user){
      if(err){
        console.log("got an error", err)
      } else {
        console.log('found user')
        res.json(user)
      }
    })
  },
  get_new_user: function(req, res){
    console.log('user.js controller in da house', req.body)
    user.findOne({}, {}, {sort: {'_id': -1}}, function(err, user){
      if(err){
        console.log('error:', err)
      } else{
        console.log("user was:", user)
        res.json(user)
      }
    });
  }
}
