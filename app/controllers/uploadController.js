const { response } = require("../middlewares/responseMiddleware");
const Event = require("../models/Event");

async function uploadFile(req, res, next) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id } });
    console.log("EVENTO ENCONTRADO: ", event);
    response(res, event, "Archivo cargado correctamente");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile,
};
