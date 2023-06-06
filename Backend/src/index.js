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
const requireAuth = require("./middleware/requireAuth");
const roles = require("./constants/roles");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authorRoutes = require("./routes/authorRoute");
const escalationRoutes = require("./routes/escalationRoute");
const commentsRoutes = require("./routes/commentRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const twilioRoutes = require("./routes/twilioRoutes");
require("dotenv").config();

app.use(
  session({
    secret: process.env.JWTSecretKey,
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
      process.env.JWTSecretKey
    );
    res.redirect(`${process.env.FrontEndUrl}/auth/success?token=${token}`);
  }
);
app.get("/failed", (req, res) => {
  res.send("Failed");
});

app.get("/validateToken", requireAuth([roles.USER]), (req, res) => {
  res.json({ success: true, user: req.currentUser });
});

app.use("/webhook", webhookRoutes);
app.use("/twilio", twilioRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/authors", authorRoutes);
app.use("/escalation", escalationRoutes);
app.use("/comments", commentsRoutes);

const server = app.listen(8000, () => {
  console.log("listening to port", server.address());
});
