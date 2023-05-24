const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const firestore = require("../services/firestoreCrud");
const User = require("../models/User");

exports.configureJwtStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "mysecretkey";

  passport.use(
    new Strategy(opts, async function (payload, done) {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
