const bcrypt = require("bcryptjs");

const User = require("../models/User");

const landing_page = (req, res) => {
  res.render("landing");
};

// get login page
const login_get = (req, res) => {
  const error = req.session.error;
  const info = req.session.info;
  req.session.info = undefined;
  req.session.error = undefined;
  res.render("login", { err: error, info: info });
};

// do login
const login_post = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email
    }
  });

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
  console.log(`Registering ${username}`);
  let user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/login");
  }

  const hashPsw = await bcrypt.hash(password, 12);

  user = User.build({
    username: username,
    email: email,
    password: hashPsw,
  });
  try {
    await user.save();
    req.session.info = "Registration successful";
    res.redirect("/login");
  } catch (err) {
    request.session.error = "Something went wrong, try again!"
    res.redirect("/registration");
  }

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

module.exports = {
  landing_page, login_get, login_post,
  register_get, register_post, dashboard_get,
  logout_post
};