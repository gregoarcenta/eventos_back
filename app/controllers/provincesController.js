const { response } = require("../middlewares/responseMiddleware");
const Province = require("../models/Province");

async function getAllProvinces(req, res, next) {
  try {

    const provinces = await Province.findAll({})

    response(res, provinces, null)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProvinces,
};
