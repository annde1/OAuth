const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      //Options for the google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect", //wehere to redirect after the user has granted permission
    },
    (accessToken, refreshToken, profileInfo, done) => {
      //Passport callback function
      console.log("Passport Callback Fired");
      console.log(profileInfo);
    }
  )
  //This callback will be executed during the authentication process
); //Telling the passport we are using google strategy. It takes in two parameters: 1) Strategy 2) Callback function
//When saying that we are using the google strategy we are saying we want to use google+ api to authenticate people on our website. For that we will need client id and client secret
//When the application starts our passport knows that it wants to use google strategy to authenticate people. This google strategy is gonna say ok I can use google api to authenticate users because I have set up some credentials and enable the api in my project online so I am allowed to use that api in my app
//redirect uri is wher we want to redirect the user after he granted permission. After setting the uri google knows to where redirect user after he granted permission
