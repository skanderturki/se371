// use when trying to access protected resources
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    req.session.error = "You have to Login first";
    res.redirect("/login");
  }
};

//use if user tries to re-log
const isLogged = (req, res, next) => {
  if (req.session.isAuth) {
    return res.redirect("/dashboard");
  } else {
    next();
  }
};

module.exports = { isAuth, isLogged };