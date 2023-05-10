const nodemailer = require('nodemailer');

const generateOTP = () => {
  let otp = Math.random();
  otp = otp * 1000000;
  return parseInt(otp);
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service : 'Gmail',
  
  auth: {
    user: process.env.VERIFIED_SENDER,
    pass: process.env.GMAIL_PWD,
  }
  
});


const sendEmail = async (email, subject, html) => {

  var mailOptions = {
    to: email,
    subject: subject,
    html: html // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
 })
}

const emailREGEX = new RegExp(process.env.EMAIL_REGEX);
const usernameREGEX = new RegExp(process.env.USERNAME_REGEX);
const passwordREGEX = new RegExp(process.env.PASSWORD_REGEX);

module.exports = { generateOTP, sendEmail, emailREGEX, usernameREGEX, passwordREGEX}