const { response } = require("../middlewares/responseMiddleware");
const Locality = require("../models/Locality")

async function getAllLocalities(req, res, next) {
  try {

    const localities = await Locality.findAll({})

    response(res, localities, null)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllLocalities,
};
