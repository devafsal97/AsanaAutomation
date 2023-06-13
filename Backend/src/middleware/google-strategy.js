const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const firestore = require("../services/firestoreCrud");
const User = require("../models/User");
require("dotenv").config();

exports.configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: `http://localhost:8000/api/google/callback`,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findUserByEmail(profile._json.email);
          if (user) {
            return done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
