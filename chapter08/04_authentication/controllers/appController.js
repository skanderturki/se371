const bcrypt = require("bcryptjs");

const User = require("../models/User");

const landing_page = (req, res) => {
  res.render("landing");
};

const login_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login", { err: error });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    req.session.error = "Invalid Credentials";
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials";
    return res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  res.redirect("/dashboard");
};

const register_get = (req, res) => {
  const error = req.session.error;
  req.session.error = undefined;
  res.render("register", { err: error });
};

const register_post = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/register");
  }

  const hasdPsw = await bcrypt.hash(password, 12);

  user = new User({
    username,
    email,
    password: hasdPsw,
  });

  await user.save();
  res.redirect("/login");
};

const dashboard_get = (req, res) => {
  const username = req.session.username;
  res.render("dashboard", { name: username });
};

const logout_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};

module.exports = { landing_page, login_get, login_post, 
                  register_get, register_post, dashboard_get, 
                  logout_post };