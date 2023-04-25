const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User Model

const User = require("../models/users");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        // match user

        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "that email dosent exist" });
            }
            // match pwd

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "pwd incorrect" });
              }
            });
          })

          .catch((err) => console.log(err));
      }
    )
  );

  // To maintain a login session,
  // Passport serializes and deserializes user information to and from the session.
  // The information that is stored is determined by the application,
  // which supplies a serializeUser and a deserializeUser function.

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
