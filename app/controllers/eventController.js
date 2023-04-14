const { response } = require("../middlewares/responseMiddleware");
const Event = require("../models/Event");
const Place = require("../models/Place");
const Role = require("../models/Role");
const User = require("../models/User");

async function index(req, res, next) {
  try {
    const events = await Event.findAll({ include: [Place] });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { id } = req.user;
    const { place_id } = req.body;
    let newPlaceCreated = null;
    let fields = [
      "name",
      "description",
      "img",
      "outstanding",
      "assistants",
      "organizer",
      "artist",
      "start_date",
      "start_time",
      "end_date",
      "end_time",
      "place_id",
    ];

    //Si no existe el place_id significa que creo un lugar que no estaba en los del default
    if (!place_id) {
      const user = await User.findOne({ where: { id: id }, include: [Role] });
      newPlaceCreated = await Place.create({
        name: "Estadio Jocay de Manta",
        user_id: user.role.name === "ADMIN" ? null : user.id,
      });

      req.body.place_id = newPlaceCreated.id;
    }

    await Event.create({ ...req.body }, { fields });
    response(res, null, "Evento agregado correctamente", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  create,
};
