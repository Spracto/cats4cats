// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: {
    type: String,
    required: true
  },
  gender: String,
  birthdate: Date,
  location: String,
  breed: String,
  about_me: String,
  indoor_outdoor: String,
  pic_0: String,
  other_pics: [{type: String}]
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);
