const passport = require("passport");
const role = require("../constants/roles");

const requireAuth = (allowedRoles) => {
  return (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      function (err, user, info) {
        console.log("user from require auth ", user);
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json("unauthorized").end();
        }

        if (user.role != role.ADMIN && !allowedRoles.include(user.role)) {
          return res.status(401).json("unauthorized").end();
        }

        req.currentUser = user;
        next();
      }
    )(req, res, next); // Pass 'next' as the third argument here
  };
};

module.exports = requireAuth;
