const { response } = require("../middlewares/responseMiddleware");
const City = require("../models/City");
const Contact = require("../models/Contact");
const Service = require("../models/Service");
const { responseContactForm } = require("../utils/sendMail");

async function index(req, res, next) {
  try {
    const contacts = await Contact.findAll({ include: [City, Service] });
    response(res, contacts, null);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, surname, email } = req.body;
    await Contact.create(
      { ...req.body },
      {
        fields: ["name", "surname", "email", "phone", "city_id", "service_id"],
      }
    );
    const responseMail = await responseContactForm(name, surname, email);
    if (responseMail.accepted.length === 0) {
      throw new Error("Ocurrio un error durante el envio del formulario");
    }
    response(
      res,
      null,
      "Gracias por confiar en nosotros!, pronto nos prondremos en contacto contigo",
      201
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { index, create };
