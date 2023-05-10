const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const User = require("../models/User");

const landing_page = (req, res) => {
  const err = "";
  res.render("landing", {err: err});
};

const login_get = (req, res) => {
  res.render("login");
};

const login_post = async (req, res) => {
  let err = "";
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    err = "Invalid Credentials";
    return res.json({ err: err , redirectionURL: "/login"});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    err = "Invalid Credentials";
    return res.json({ err: err , redirectionURL: "/login"});
  }

  const token_payload = {id: user._id, email: email, expiration: Math.floor(Date.now() / 1000) - 1 + 3600};

  const token = jwt.sign(token_payload, process.env.SECRET_TOKEN_KEY);
  //const token = crypto.randomBytes(64).toString('hex');
  res.json({ accessToken: token, redirectionURL: "/dashboard"});
};

const register_get = (req, res) => {
  const err = "";
  res.render("register", { err: err });
};

const register_post = async (req, res) => {
  const { username, email, password } = req.body;
  let err = "";

  let user = await User.findOne({ email: email });

  if (user) {
    err = "User already exists";
    return res.render("register", {err: err});
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

const dashboard_post = (req, res) => {
  const token = req.body.token;
  res.json({ redirectionURL: "dashboard", accessToken: token });
};

const dashboard_get = (req, res) => {
  const token = req.params.token;
  res.json({ redirectionURL: "dashboard", accessToken: token });
};

const logout_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};

module.exports = { landing_page, login_get, login_post, 
                  register_get, register_post, dashboard_post, 
                  logout_post, dashboard_get };