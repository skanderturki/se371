const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const utils = require('./utils.js');

require('dotenv').config();

const VERIFIED_SENDER = process.env.VERIFIED_SENDER;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'skander.turki.psu@gmail.com',
      pass: 'mamyylasnintrdhr',
    }
    
});

const app = express();

// configure static resources folder
app.use(express.static('public')); 

// configure template engine
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('registration', {user: 'Visitor'});
});

// registration
app.post('/register',function(req,res){
  const otp = utils.generateOTP();
  email = req.body.email;

  // send mail with defined transport object
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

});

app.post('/resendotp', function(req,res){
  const otp = utils.generateOTP();
  email = req.body.email;

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

});

app.use( (request, response) => {
  response.status(404).render('404', { title: "404", root: __dirname });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});