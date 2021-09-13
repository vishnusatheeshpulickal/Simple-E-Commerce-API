const sgMail = require("@sendgrid/mail");
const {welcomeMailTemplate} = require('../templates/welcomeMailTemplate')
const {passwordResetMailTemplate} = require('../templates/passwordResetMailTemplate');

require("dotenv/config");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (name, email) => {
    const content = welcomeMailTemplate(name)
  const msg = {
    to: email,
    from: "vishnusatheeshdev@gmail.com",
    subject: "Thanks for joining!",
    html: content ,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendResetPasswordMail = (email,link) =>{
  const content = passwordResetMailTemplate(link);
  const msg = {
    to: email,
    from: "vishnusatheeshdev@gmail.com",
    subject: "Password Reset Mail!",
    html:content,
  };
  sgMail.send(msg)
  .then(()=>console.log("Email Sent"))
  .catch((error)=>console.log(error))
}

module.exports = { sendWelcomeMail,sendResetPasswordMail };
