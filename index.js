const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const connect = require("./database/connection");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
const keys = require("./config/keys");
const session = require("express-session");
const app = express();

// Set up view engine
app.set("view engine", "ejs");

// Cookie encryption
app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // day in ms
  })
);

// Initialize passport
app.use(passport.initialize());
// Use session cookies to control logging in
app.use(passport.session());

// Connect to MongoDB
connect();

// Set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Create home route
app.get("/", (req, res) => {
  res.render("home"); // render home template
});

app.listen(5000, () => {
  console.log("App now listening for requests on port 5000");
});
