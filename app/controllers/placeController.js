const { Op, Sequelize } = require("sequelize");
const { response } = require("../middlewares/responseMiddleware");
const Place = require("../models/Place");
const User = require("../models/User");
const Direction = require("../models/Direction");
const Province = require("../models/Province");
const City = require("../models/City");

async function getAllPlaces(req, res, next) {
  try {
    const { term } = req.params;
    const fragmentoBusqueda = `%${term}%`;

    const places = await Place.findAll({
      where: {
        [Op.and]: [
          Sequelize.literal(
            `unaccent(name) ILIKE unaccent('%${fragmentoBusqueda}%')`
          ),
          {
            user_id: {
              [Op.is]: null,
            },
          },
        ],
      },
      limit: 5,
    });

    response(res, places, null);
  } catch (error) {
    next(error);
  }
}

async function getPlaceById(req, res, next) {
  try {
    const { id } = req.params;
    const place = await Place.findOne({
      where: { id },
      include: [
        {
          model: Direction,
          include: [Province, City],
        },
      ],
    });
    if (!place) {
      res.status(404);
      throw new Error("El lugar al que intentas acceder no existe");
    }
    response(res, place, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPlaces,
  getPlaceById,
};
