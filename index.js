const express = require("express");
const authRoutes = require("./routes/auth-routes");
const connect = require("./database/connection");
const passportSetup = require("./config/passport-setup");
const app = express();

// Set up view engine
app.set("view engine", "ejs");

// Connect to MongoDB
connect();

// Set up routes
app.use("/auth", authRoutes);

// Create home route
app.get("/", (req, res) => {
  res.render("home"); // render home template
});

app.listen(5000, () => {
  console.log("App now listening for requests on port 5000");
});
