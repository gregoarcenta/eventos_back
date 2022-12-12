const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "gregoarcenta@gmail.com", // generated ethereal user
    pass: process.env.MAIL_PASS, // generated ethereal password
  },
});

function verifyMail() {
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log("No se establecio la conexion para enviar mails");
    } else {
      console.log("Server is ready to take our messages");
    }
  });
}

module.exports = {
  transporter,
  verifyMail
}
