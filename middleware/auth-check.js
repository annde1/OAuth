//Check if user is logged in, we have access to req.user, if it's thruthy then it means he is logged in
const authCheck = (req, res, next) => {
  const isLoggedIn = req.user;
  if (!isLoggedIn) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};
module.exports = authCheck;
