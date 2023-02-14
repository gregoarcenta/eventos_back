const { transporter } = require("../../config/mailer");

module.exports = {
  verifyMail: async (token, to) => {
    try {
      const url = `${process.env.ACTIVE_URL}/registro/verificacion/${token}`;
      const info = await transporter.sendMail({
        from: `"EventosEC 📩" <${process.env.MAIL}>`,
        to,
        subject: "Verificación de email ✔",
        html: `<p>Verifica tu email dando click en el siguiente <a href="${url}">enlace</a></p>`,
      });
      return info;
    } catch (error) {
      throw new Error("No se pudo enviar el correo de verificacion");
    }
  },
  resetPassword: async (token, to) => {
    try {
      const url = `${process.env.ACTIVE_URL}/recuperar-cuenta/${token}`;
      const info = await transporter.sendMail({
        from: `"EventosEC 📩" <${process.env.MAIL}>`,
        to,
        subject: "Recuperación de cuenta ✔",
        html: `<p>Parece que has olvidado tu contraseña, puedes restablecerla desde el siguiente <a href="${url}">enlace</a></p>`,
      });
      return info;
    } catch (error) {
      console.log(error);
      throw new Error(
        "No se pudo enviar el correo de restablecimiento de contraseña"
      );
    }
  },
};
