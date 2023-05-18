const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const firestore = require("../services/firestoreCrud");

exports.configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "353661569835-ofr0n06sklkqmoi1eoj812fo8caaa2oj.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const user = await firestore.findUserById("JvBx1TDjbvXw51QKNPL8");
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
