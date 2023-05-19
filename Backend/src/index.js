const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const googleStategy = require("./middleware/google-strategy");
const jwtStategy = require("./middleware/jwt-strategy");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const firestore = require("./services/firestoreCrud");
const requireAuth = require("./middleware/checkAccessToken");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
googleStategy.configureGoogleStrategy();
jwtStategy.configureJwtStrategy();

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const userdata = await firestore.findUserById(id);
  done(null, userdata);
});

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(cors());

const webhookRoutes = require("./routes/webhookroutes");
const apiRoutes = require("./routes/apiroutes");
const authRoutes = require("./routes/googleauth");

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    session: false,
  }),
  function (req, res) {
    const token = jwt.sign(
      {
        id: req.user.id,
      },
      "mysecretkey"
    );
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);
app.get("/failed", (req, res) => {
  res.send("Failed");
});

app.get("/validateToken", requireAuth.requireAuth, (req, res) => {
  res.json({ success: true, user: req.currentUser });
});

app.use("/webhook", webhookRoutes);
app.use("/api", apiRoutes);

const server = app.listen(8000, () => {
  console.log("listening to port", server.address());
});
