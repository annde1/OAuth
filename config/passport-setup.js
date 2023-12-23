const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const { createUser } = require("../service/user-service");
const { checkUser } = require("../service/user-service");

//Serialize user information into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id); //serialize user mongodb id (put it in the cookie)
}); //null - error parameter

//Deserialize user when cookie comes back from the browser. Retreieve id from the cookie
passport.deserializeUser((id, done) => {
  //When the cookie comes back take the id and check if the user exists in the database
  checkUser(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.error(err));
  //Check if user exists in the db
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profileInfo, done) => {
      // console.log(profileInfo);
      createUser(profileInfo, done); //passing done to createUser to serialize user
      // .then((user) => console.log("New user created:", user))
      // .catch((err) => console.log(err));
    }
  )
);
//Telling the passport we are using google strategy. It takes in two parameters: 1) Strategy 2) Callback function
//When saying that we are using the google strategy we are saying we want to use google+ api to authenticate people on our website. For that we will need client id and client secret
//When the application starts our passport knows that it wants to use google strategy to authenticate people. This google strategy is gonna say ok I can use google api to authenticate users because I have set up some credentials and enable the api in my project online so I am allowed to use that api in my app
//redirect uri is wher we want to redirect the user after he granted permission. After setting the uri google knows to where redirect user after he granted permission
