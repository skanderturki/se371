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


//module.exports = sendMessage;


