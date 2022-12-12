const { transporter } = require("../../config/mailer");

module.exports = {
  verifyMail: async (token, to) => {
    try {
      const url = `http://localhost:3000/register/verify/${token}`;
      const info = await transporter.sendMail({
        from: '"EventosEC 📩" <gregoarcenta@gmail.com>', // sender address
        to, // list of receivers
        subject: "Verificación de email ✔", // Subject line
        html: `<p>Verifica tu email dando click en el siguiente <a href="${url}">enlace</a></p>`, // html body
      });
      return info;
    } catch (error) {
      throw new Error("could not send mail");
    }
  },
};
