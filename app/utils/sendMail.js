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
      throw new Error(
        "No se pudo enviar el correo de restablecimiento de contraseña"
      );
    }
  },
  responseContactForm: async (name, surname, to) => {
    try {
      const info = await transporter.sendMail({
        from: `"EventosEC 📩" <${process.env.MAIL}>`,
        to,
        subject: "Solicitud de evento",
        html: `<h3>Hola ${name} ${surname},</h3>
            <p>¡Muchas gracias por enviar el formulario!</p>
            <p>Muy pronto nos pondremos en contacto contigo para coordinar mas acerca de tu evento.</p>
        `,
      });
      return info;
    } catch (error) {
      throw new Error(
        "No se pudo enviar el correo de respuesta a la solicitud del evento"
      );
    }
  },
};
