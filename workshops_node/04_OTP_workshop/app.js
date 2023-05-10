const express = require('express');
const bodyparser = require('body-parser');
const sendMessage = require('./email.js');
require('dotenv').config();

const VERIFIED_SENDER = process.env.VERIFIED_SENDER;

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'skanderturki@gmail.com',
  from: process.env.VERIFIED_SENDER, // Use the email address or domain you verified above
  subject: 'Testing this thing',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });


const path = require('path');


var email;

var otp = Math.random();

otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

const app = express();

// configure static resources folder
app.use(express.static('public')); 

// configure template engine
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('registration');
});

app.post('/send',function(req,res){
  email = req.body.email;

   // send mail with defined transport object
  const to = req.body.email;
  const subject = "Otp for registration is: ";
  const html = "<h3>OTP for account verification is </h3>"  + 
                "<h1 style='font-weight:bold;'>" + 
                otp +"</h1>"; // html body
   
  try {
    //sendMessage(to, VERIFIED_SENDER, subject, '', html);
    console.log('Message sent: %s', info);   
    res.render('otpverification');
  } catch (err) {
    return console.log(error);
  }

});

app.use( (request, response) => {
  response.status(404).render('404', { title: "404", root: __dirname });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});