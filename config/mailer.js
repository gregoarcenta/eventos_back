const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASS, // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

function verifyMail() {
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log("Error al establecer la conexion con el servidor de correos");
    } else {
      console.log("El servidor de correos esta listo");
    }
  });
}

module.exports = {
  transporter,
  verifyMail
}
