const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user');

// TODO: will do it after some time
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});
  

passport.use(new GoogleStrategy({
   clientID: '709763370284-fmtn1rno28uehg7mdb9nihbmk424s2kg.apps.googleusercontent.com',
   clientSecret: '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',
   callbackURL: 'http://localhost:4000/auth/google/callback' // maybe if not given picks from
}, (accessToken, refreshToken, profile, next) => {
    // lets hold this callback as of now
    console.log('Profile', profile);
    
    User.findOne({email: profile._json.email})
        .then((user) => {
            if (user) {
                return next(null, user);
            } else {
                User.create({
                    email: profile._json.email,
                    name: profile.displayName,
                    googleId: profile.id
                }).then(user => {
                   return  next(null, user);
                }).catch(err => console.log(err));
            }
    });
}));