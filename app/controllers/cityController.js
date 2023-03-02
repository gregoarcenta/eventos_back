const { response } = require("../middlewares/responseMiddleware");
const City = require("../models/City");

async function getAllCitiesByIdProvince(req, res, next) {
  try {
    const { province_id } = req.params;

    const cities = await City.findAll({ where: { province_id } });

    response(res, cities, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCitiesByIdProvince,
};
