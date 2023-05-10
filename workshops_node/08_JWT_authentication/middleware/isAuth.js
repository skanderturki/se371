const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  let token = "";
  if(req.body) {
    token = req.body.token;
  } else if (req.params) {
    token = req.params.token;
  }

  const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
  if(decoded.expiration < Math.floor(Date.now() / 1000)) { // not expires yet
    res.render("login", {err: "Your session ended, please re-login!"});
  }
  if (decoded) {
    req.user_email = decoded.email;
    next();
  } else {
    res.render("login", {err: "You have to Login first", accessToken: ""});
  }
};

module.exports = isAuth;