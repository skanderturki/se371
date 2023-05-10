const bcrypt = require("bcryptjs");
const utils = require("../utils.js");

const User = require("../models/User");
const OTPEntry = require("../models/OTPs");

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

  if (!user.verified) {
    req.session.error = "User not verified";
    return res.render("otpverification", {msg: "Request a new OTP to verify your account", user: email});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials";
    return res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  req.session.save( () => {
    res.render("dashboard", {user: user.username});
  });

};

const register_get = (req, res) => {
  const error = req.session.error;
  req.session.error = undefined;
  res.render("register", { err: error });
};

const register_post = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate data block
  {
    if(username == "" || email == "" || password == ""){
      req.session.error = "Username, email and password should not be left empty";
      return res.redirect("/register");
    } else if(!utils.usernameREGEX.test(username)){
      req.session.error = "Invalid username format";
      return res.redirect("/register");
    } else if(!utils.emailREGEX.test(email)){
      req.session.error = "Invalid email format";
      return res.redirect("/register");
    } else if(!utils.passwordREGEX.test(password)){
      req.session.error = "Invalid password format";
      return res.redirect("/register");
    }
  }

  // See if user already exists
  let user = await User.findOne({ email: email });
  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/register");
  }

  // Register new user
  const hashPsw = await bcrypt.hash(password, 12);

  user = new User({
    username,
    email,
    password: hashPsw,
    verified: false,
  });

  // Generate new OTP for new user
  let otp = utils.generateOTP();

  // Save OTP in DB
  let optentry = new OTPEntry({
    email,
    otp,
  });

  await user.save();
  await optentry.save();

  // send email with OTP
  const html = "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>";
  await utils.sendEmail(email, "Otp for registration is: ", html);

  // redirect to otp verification page
  res.render('otpverification', {msg: "The One-Time-Password (OTP) has been sent to your email.", 
    email: email,
    sourcePage: 'register'
  });

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

const resendotp_post = async (req,res) => {
  const email = req.body.email;
  const otp = utils.generateOTP();

  let optentry = new OTPEntry({
    email,
    otp,
  });

  const oldOTP = await OTPEntry.findOne({ email });

  if (oldOTP) {
    oldOTP.delete();
  }

  var mailOptions = {
    to: email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
  };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      res.render('otpverification', {msg: "The One-Time-Password (OTP) has been sent to your email.", user: email}); 
  });

}

const verifyotp_post = async (req, res) => {
    const {email, otp} = req.body;

    // See if OTP is in DB
    let optStored = await OTPEntry.findOne({ email: email });
    if (!optStored) {
      return res.render("register", {msg: "Request a new OTP to verify your account", user: email});
    }

    if(otp !== optStored.otp){
      return res.render("otpverification", {msg: "OTP incorect, request a new OTP to verify your account", user: email});
    }

    // Set user to verified
    let user = await User.findOne({ email: email });
    if (user) {
      // set verified
      await user.update({verified: true});
      //Missing: Remove OTP from OTPEntry because it was consumed!!
      
      return res.render("login", {err: ""});
    } else {
      // registration problem
      req.session.error = "Registration process failed";
      return res.render("register", {msg: "The registration process encountered an unexpected error, contact the website admin", user: email});
    }

} 

module.exports = { landing_page, login_get, login_post, 
                  register_get, register_post, dashboard_get, 
                  logout_post, resendotp_post, verifyotp_post};