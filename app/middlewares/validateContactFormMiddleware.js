const axios = require("axios");

exports.validateContactForm = async (req, res, next) => {
  try {
    const { captcha_token } = req.body;
    const secret = process.env.CAPTCHA_SITE_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_token}`;
    const { data } = await axios({ method: "post", url, data: {} });
    console.log("respuesta token captcha: ", data);
    if (!data["error-codes"] && data.success && data.score >= 0.1) {
      return next();
    }
    res.status(400);
    throw new Error(
      "Por el momento no es posible enviar el formulario, inténtalo de nuevo más tarde"
    );
  } catch (error) {
    next(error);
  }
};
