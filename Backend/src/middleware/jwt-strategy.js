const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const firestore = require("../services/firestoreCrud");

exports.configureJwtStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "mysecretkey";

  passport.use(
    new Strategy(opts, async function (payload, done) {
      console.log("Jwt payload", payload);
      const user = await firestore.findUserById(payload.id);
      console.log("user from jwt stratagy", user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};