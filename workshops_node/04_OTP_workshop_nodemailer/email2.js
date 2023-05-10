const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = (to, from, subject, text, html) => {
  const msg = {to, from, subject, text, html};
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

const sendMessageProm = function(to, subject, text, html) {
  return new Promise((resolve, reject) => {
    sendMessage(to, subject, text, html, (err, obj) => {
      if(err) reject(err);
      else resolve(obj);
    })
  });
}




module.exports = sendMessageProm;


