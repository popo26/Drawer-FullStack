const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// Authorization - To protect endpoints

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "secret-key",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub })
        .then((user) => {
          if (user) {
            return done(null, user);
          } 
          else {
            return done(null, false);
          }
        })
        .catch((error) => {
          return done(error, false);
        });
    }
  )
);

// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: cookieExtractor,
//       secretOrKey: "secret-key",
//     },
//     (payload, done) => {
//       User.findById({ _id: payload.sub }, (error, user) => {
//         if (error) return done(error, false);
//         if (user) return done(null, user);
//         else return done(null, false);
//       });
//     }
//   )
// );

//Authenticated local strategy using username and password - Used when we login
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) return done(null, false);
        return user.comparePassword(password, done);
      })
      .catch((error) => {
        return done(error);
      });
  })
);

//   new LocalStrategy((username, email, password, done) => {
//     User.findOne({ email }, (error, user) => {
//       //Something went wrong with database
//       if (error) return done(error);
//       //If no user exist
//       if (!user) return done(null, false);
//       //check if password is correct
//       user.comparePassword(password, done);
//     });
//   })
// );
