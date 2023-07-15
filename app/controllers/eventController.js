const { Op } = require("sequelize");
const { response } = require("../middlewares/responseMiddleware");
const City = require("../models/City");
const Direction = require("../models/Direction");
const Event = require("../models/Event");
const Place = require("../models/Place");
const Province = require("../models/Province");
const Role = require("../models/Role");
const Service = require("../models/Service");
const User = require("../models/User");
const PlaceLocality = require("../models/PlaceLocality");
const Locality = require("../models/Locality");

function formateaMomento(momento) {
  const regexp = /\d\d:\d\d(:\d\d)?/;
  if (regexp.test(momento)) {
    const units = momento.split(":");
    return +units[0] * 3600 + +units[1] * 60 + (+units[2] || 0);
  }
  throw new Error("Formato de hora invalido");
}

function generadorHorario(horaApertura, horaCierre) {
  let a = formateaMomento(horaApertura);
  let c = formateaMomento(horaCierre);

  return function (hora) {
    const h = formateaMomento(hora);
    if (a > c) {
      return h >= a || h <= c;
    }
    return h >= a && h <= c;
  };
}

async function getAllEvents(req, res, next) {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Place,
          include: [{ model: Direction, include: [Province, City] }],
        },
        {
          model: PlaceLocality,
          include: [Locality],
        },
        { model: Service },
      ],
      order: [["created_at", "DESC"]],
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function getAllEventsPublish(req, res, next) {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Place,
          include: [{ model: Direction, include: [Province, City] }],
        },
        {
          model: PlaceLocality,
          include: [Locality],
        },
        { model: Service },
      ],
      order: [["created_at", "DESC"]],
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function getFeaturedEvents(req, res, next) {
  try {
    const events = await Event.findAll({
      where: { outstanding: true },
      include: [
        {
          model: Place,
          include: [{ model: Direction, include: [Province, City] }],
        },
        {
          model: PlaceLocality,
          include: [Locality],
        },
        { model: Service },
      ],
      order: [["created_at", "DESC"]],
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Place,
          include: [{ model: Direction, include: [Province, City] }],
        },
        {
          model: PlaceLocality,
          include: [Locality],
        },
        { model: Service },
      ],
      order: [["created_at", "DESC"]],
      limit: 8,
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({
      where: { id },
    });
    if (!event) {
      res.status(404);
      throw new Error("El evento al que intentas acceder no existe");
    }
    response(res, event, null);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { place_id, place } = req.body;
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
      "service_id",
      "place_id",
    ];

    if (!req.user) {
      res.status(404);
      throw new Error(
        "El usuario con el que intentas crear el evento no existe"
      );
    }

    const { id } = req.user;

    // Valida que no se cree un evento en el mismo horario
    if (place_id) {
      const events = await Event.findAll({
        where: {
          place_id: req.body.place_id,
          start_date: req.body.start_date,
        },
      });
      if (events.length > 0) {
        events.forEach((e) => {
          const event = e.toJSON();
          if (
            generadorHorario(
              event.start_time,
              event.end_time
            )(req.body.start_time)
          ) {
            throw new Error("Ya existe un evento en ese mismo horario");
          }
        });
      }
    }

    // Si no existe el place_id significa que creo un lugar que no estaba en los del default
    if (!place_id) {
      const user = await User.findOne({ where: { id }, include: [Role] });
      newPlaceCreated = await Place.create(
        {
          name: place.name,
          user_id: user.role.name === "ADMIN" ? null : user.id,
          direction: {
            description: place.description,
            reference: place.reference,
            province_id: place.province_id,
            city_id: place.city_id,
            lat: place.lat,
            lng: place.lng,
          },
        },
        {
          include: [Direction],
        }
      );

      req.body.place_id = newPlaceCreated.id;
    }

    await Event.create({ ...req.body }, { fields, include: [PlaceLocality] });
    response(res, null, "Evento agregado correctamente", 201);
  } catch (error) {
    next(error);
  }
}

async function searchEvent(req, res, next) {
  try {
    const { term } = req.params;
    const fragmentoBusqueda = `%${term}%`;
    const events = await Event.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: fragmentoBusqueda,
            },
          },
          {
            description: {
              [Op.iLike]: fragmentoBusqueda,
            },
          },
        ],
      },
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEvents,
  getAllEventsPublish,
  getFeaturedEvents,
  getUpcomingEvents,
  create,
  searchEvent,
  getEventById,
};
