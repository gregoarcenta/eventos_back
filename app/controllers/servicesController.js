const { response } = require("../middlewares/responseMiddleware");
const Service = require("../models/Service");

async function getAllServices(req, res, next) {
  try {

    const services = await Service.findAll({})

    response(res, services, null)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllServices,
};
