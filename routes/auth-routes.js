const router = require("express").Router(); //Create instance of router
const passport = require("passport");
//Auth login:
router.get("/login", (req, res) => {
  res.render("login"); //will render login page with google button
});

//Auth logout:
router.get("/logout", (req, res) => {
  res.send("Logging out"); //Handle with passport.
});
//Auth with google:
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"], //what we want to retrieve from the users profile. We would like you profile information. Would you allow this app to get it
    failureRedirect: "/auth/login",
  })
); //this will be handled with passport. Go to consent screen. Authenticate with google strategy. It knows to activate the google strategy to authenticate someone and it's gonna redirect someone to consent screen

//Callback route for google to redirect

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //We can access the user on the request object
  //   res.send(req.user);
  res.redirect("/profile");
});
//redirect?code=.... - the code that we get in query will be later exchanged for profile info. Once it will get the info the passport callback function will be fired. When we arrive to redirect then passport sees that we have the code, it understand that the person already has been to the consent screen, so now we can exhange the code for the profile inforrmation. Passport.authenticate fires the passport callback function before it gets to the router. User stuff will be done as well as serializing cookie
module.exports = router;
