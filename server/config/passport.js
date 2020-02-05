const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const models = require('../models');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log(email, password);
      // Check if user exist
      // if exists
      let params = [email];
      models.user.get(params, (err, user) => {
        if (err) {
          console.log(err.message);
        } else if (!user) {
          throw 'User does not exist';
        } else {
          // compare password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            // if password match
            if (err) {
              throw err;
            } else if (isMatch) {
              return done(null, user);
            } else {
              // message password incorrect
              return done(null, false, { message: 'Password Incorrect' });
            }
          });
        }
      });
    })
  );
  //create session
  passport.serializeUser((user, done) => done(null, user.email));

  //verify session
  passport.deserializeUser((email, done) => {
    models.user.get([email], (err, user) => done(err, user));
  });
};
