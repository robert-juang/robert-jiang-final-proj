const db = require("./db.js"); 
const mongoose = require('mongoose'); 
//import './db.mjs'; //only import user from
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const User = mongoose.model('User'); //each individual user 

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.find({}).then(foundUser=>{
        foundUser.forEach(user=>{
          if (!user){
            return done(null, false);
          }
          if (user.password === undefined) return done(null,false); 
          bcrypt.compare(password, user.password, (err, result)=>{
            if (err) throw err; 
            if (result === true){
              return done(null,user);
            }
            else{
              return done(null,false);
            }
          })
        })
      }) 
    })); 

  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    User.find({_id:id}).then((foundUser,err)=>{
      console.log(foundUser); 
      const userInformation = {
        username: foundUser[0].username,
      };
      cb(err, userInformation);
    })
    // User.findOne({ _id: id }, (err, user) => {
    //   const userInformation = {
    //     username: user.username,
    //   };
    //   cb(err, userInformation);
    // });
  });
};

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((_id, done) => {
// User.findById( _id, (err, user) => {
//   if(err){
//       done(null, false, {error:err});
//   } else {
//       done(null, user);
//   }
// });
// });