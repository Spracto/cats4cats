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
  password: {
    type: String,
    required: true
  },
  birthdate: Date,
  location: String,
  breed: String,
  pic_0: String,
  pic_1: String,
  pic_2: String,
  pic_3: String

});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);
