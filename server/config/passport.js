const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('brcyptjs');
const models = require('../models');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log(email, password);
      // Check if user exist
      // if exists
      // let params = [req.query.email];
      // models.user.get(params, (err, result) => {
      //   if (err) {
      //     console.log(err.message);
      //   } else {
      //     res.send(result);
      //   }
      // });
      // create session
      // else
      // message password incorrect
    })
  );
};
