const router = require("express").Router();
const authCheck = require("../middleware/auth-check");

//Profile page route, check if user is logged in and redirect:
router.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user }); //show user data
});
module.exports = router;
