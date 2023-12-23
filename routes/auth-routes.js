const router = require("express").Router(); //Create instance of router
const passport = require("passport");

//Auth login: /auth/login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user }); //will render login page with google button. Send along user object so we can conditionally render the menu
});

//Auth logout: /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  }); //Handle with passport. Passport logout function, logout and redirect to home route
});

//Auth login with google:
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"], // Authenticate the user using google strategy and retrieve his profile information
    failureRedirect: "/auth/login",
  })
); //Go to consent screen. Authenticate with google strategy.

//Callback route for google to redirect. Exchange the profile code for actual user information and then redirect to his profile
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //We can access the user on the request object and pass it further
  //   res.send(req.user);
  res.redirect("/profile");
});
//redirect?code=.... - the code that we get in query will be later exchanged for profile info. Once it will get the info the passport callback function will be fired (create user). When we arrive to redirect then passport sees that we have the code, it understand that the person already has been to the consent screen, so now we can exhange the code for the profile inforrmation. Passport.authenticate fires the passport callback function before it gets to the router. User stuff will be done as well as serializing cookie
module.exports = router;
