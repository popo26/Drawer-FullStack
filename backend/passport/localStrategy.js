const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email", // In order to use email as username
  },
  function (username, password, done) {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!user.checkPassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      });
  }
);

module.exports = strategy;
