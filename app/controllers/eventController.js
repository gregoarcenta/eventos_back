const { Op, where, Sequelize } = require("sequelize");
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
const { excludeFieldsUser } = require("../utils/utils");

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
        { model: User },
      ],
      order: [["created_at", "DESC"]],
    });

    const newEvents = events.map((event) => {
      const data = event.toJSON();
      return { ...data, user: excludeFieldsUser(data.user) };
    });
    response(res, newEvents, null);
  } catch (error) {
    next(error);
  }
}

async function getAllEventsPublish(req, res, next) {
  try {
    const events = await Event.findAll({
      where: { publish: true },
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
      where: { outstanding: true, publish: true },
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
      where: { publish: true },
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
        { model: User },
      ],
    });
    if (!event) {
      res.status(404);
      throw new Error("El evento al que intentas acceder no existe");
    }
    const dataEvent = event.toJSON();
    const newEvent = { ...dataEvent, user: excludeFieldsUser(dataEvent.user) };
    response(res, newEvent, null);
  } catch (error) {
    next(error);
  }
}

async function getEventPublishById(req, res, next) {
  try {
    const { id } = req.params;
    const event = await Event.findOne({
      where: { id, publish: true },
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
    });
    if (!event) {
      res.status(404);
      throw new Error("El evento al que intentas acceder no existe");
    }
    response(res, [], null);
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
      "publish",
      "assistants",
      "organizer",
      "artist",
      "start_date",
      "start_time",
      "end_date",
      "end_time",
      "service_id",
      "place_id",
      "user_id",
    ];

    if (!req.user) {
      res.status(404);
      throw new Error(
        "El usuario con el que intentas crear el evento no existe"
      );
    }

    const { id, username } = req.user;

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

    req.body.user_id = id;
    if (!req.body.organizer) {
      req.body.organizer = username;
    }

    await Event.create({ ...req.body }, { fields, include: [PlaceLocality] });
    response(res, null, "Evento agregado correctamente", 201);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { place_id, place } = req.body.event;
    let newPlaceCreated = null;
    let fields = [
      "name",
      "description",
      "img",
      "outstanding",
      "publish",
      "assistants",
      "organizer",
      "artist",
      "start_date",
      "start_time",
      "end_date",
      "end_time",
      "service_id",
      "place_id"
    ];

    const { id, username } = req.user;

    // Valida que no se cree un evento en el mismo horario
    if (place_id) {
      const events = await Event.findAll({
        where: {
          id: {
            [Op.ne]: req.body.eventId,
          },
          place_id: req.body.event.place_id,
          start_date: req.body.event.start_date,
        },
      });
      if (events.length > 0) {
        events.forEach((e) => {
          const event = e.toJSON();
          if (
            generadorHorario(
              event.start_time,
              event.end_time
            )(req.body.event.start_time)
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

      req.body.event.place_id = newPlaceCreated.id;
    }

    if (!req.body.event.organizer) {
      req.body.event.organizer = username;
    }

    const listaExistente = [];
    for await (const localityData of req.body.event.place_localities) {
      const { localityId, ...data } = localityData;
      if (localityId) {
        listaExistente.push(localityId);
        // Si la localidad existe, actualiza sus datos.
        await PlaceLocality.update({ ...data }, { where: { id: localityId } });
      } else {
        // Si la localidad no existe, crea una nueva.
        const response = await PlaceLocality.create({
          ...data,
          event_id: req.body.eventId,
        });
        listaExistente.push(response.id);
      }
    }
    // Buscar las localidades existentes que no están presentes en el arreglo y eliminarlas.
    await PlaceLocality.destroy({
      where: {
        event_id: req.body.eventId,
        id: {
          [Sequelize.Op.notIn]: listaExistente,
        },
      },
    });

    await Event.update(
      { ...req.body.event },
      { where: { id: req.body.eventId }, fields }
    );
    response(res, null, "Evento actualizado correctamente", 200);
  } catch (error) {
    next(error);
  }
}

async function updateGeneralData(req, res, next) {
  try {
    const { username } = req.user;
    let fields = [
      "name",
      "description",
      "img",
      "outstanding",
      "publish",
      "organizer",
      "artist",
      "service_id"
    ];

    if (!req.body.event.organizer) {
      req.body.event.organizer = username;
    }

    await Event.update(
      { ...req.body.event },
      { where: { id: req.body.eventId }, fields }
    );
    response(res, null, "Información general del evento actualizada correctamente!");
  } catch (error) {
    next(error);
  }
}

async function updatePlaceData(req, res, next) {
  try {
    let fields = [
      "start_date",
      "start_time",
      "end_date",
      "end_time",
      "place_id"
    ];
    const { place_id, place } = req.body.event;
    const { id } = req.user;
    let newPlaceCreated = null;

    // Valida que no se cree un evento en el mismo horario
    if (place_id) {
      const events = await Event.findAll({
        where: {
          id: {
            [Op.ne]: req.body.eventId,
          },
          place_id: req.body.event.place_id,
          start_date: req.body.event.start_date,
        },
      });
      if (events.length > 0) {
        events.forEach((e) => {
          const event = e.toJSON();
          if (
            generadorHorario(
              event.start_time,
              event.end_time
            )(req.body.event.start_time)
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

      req.body.event.place_id = newPlaceCreated.id;
    }

    await Event.update(
      { ...req.body.event },
      { where: { id: req.body.eventId }, fields }
    );
    response(res, null, "Lugar del evento actualizado correctamente!");
  } catch (error) {
    next(error);
  }
}

async function updateLocalitiesData(req, res, next) {
  try {
    const listaExistente = [];
    for await (const localityData of req.body.event.place_localities) {
      const { localityId, ...data } = localityData;
      if (localityId) {
        listaExistente.push(localityId);
        // Si la localidad existe, actualiza sus datos.
        await PlaceLocality.update({ ...data }, { where: { id: localityId } });
      } else {
        // Si la localidad no existe, crea una nueva.
        const response = await PlaceLocality.create({
          ...data,
          event_id: req.body.eventId,
        });
        listaExistente.push(response.id);
      }
    }
    // Buscar las localidades existentes que no están presentes en el arreglo y eliminarlas.
    await PlaceLocality.destroy({
      where: {
        event_id: req.body.eventId,
        id: {
          [Sequelize.Op.notIn]: listaExistente,
        },
      },
    });

    response(res, null, "Localidades del evento actualizadas correctamente!");
  } catch (error) {
    next(error);
  }
}

async function searchEvents(req, res, next) {
  try {
    const { term } = req.body;
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

async function searchEventsPublish(req, res, next) {
  try {
    const { conditions } = req.body;
    const whereConditions = { publish: true };
    if (conditions.city) {
      whereConditions["$place.direction.city_id$"] = conditions.city;
    }
    if (conditions.type) {
      whereConditions.service_id = conditions.type;
    }
    if (conditions.start_date && conditions.end_date) {
      whereConditions.start_date = {
        [Op.between]: [conditions.start_date, conditions.end_date],
      };
    } else if (conditions.start_date) {
      whereConditions.start_date = {
        [Op.gte]: conditions.start_date,
      };
    } else if (conditions.end_date) {
      whereConditions.start_date = {
        [Op.lte]: conditions.end_date,
      };
    }

    if (conditions.outstanding) {
      whereConditions.outstanding = conditions.outstanding;
    }

    if (conditions.term) {
      const fragmentoBusqueda = `%${conditions.term}%`;
      whereConditions[Op.or] = [
        Sequelize.literal(
          `unaccent("event"."name") ILIKE unaccent('%${fragmentoBusqueda}%')`
        ),
        Sequelize.literal(
          `unaccent("event"."description") ILIKE unaccent('%${fragmentoBusqueda}%')`
        ),
      ];
    }
    // console.log(whereConditions);

    const events = await Event.findAll({
      where: whereConditions,
      include: [
        {
          model: Place,
          as: "place", // Alias para referenciar la relación con la tabla places
          include: [
            {
              model: Direction,
              as: "direction", // Alias para referenciar la relación con la tabla directions
            },
          ],
        },
      ],
    });
    response(res, events, null);
  } catch (error) {
    next(error);
  }
}

async function getCitiesEvents(req, res, next) {
  try {
    const citiesWithNullUserId = await Event.findAll({
      where: { publish: true },
      include: [
        {
          model: Place,
          where: {
            user_id: null, // Condición para el user_id nulo en el lugar (place).
          },
          include: [
            {
              model: Direction,
              include: [
                {
                  model: City,
                },
              ],
            },
          ],
        },
      ],
      attributes: [], // Excluimos atributos del evento, no los necesitamos en el resultado.
    });
    const cityMap = new Map();
    citiesWithNullUserId.forEach((event) => {
      const cityId = event.place.direction.city.id;
      const cityName = event.place.direction.city.name;
      if (!cityMap.has(cityId)) {
        cityMap.set(cityId, { id: cityId, name: cityName });
      }
    });

    // Extraer las ciudades únicas del mapa
    const uniqueCities = Array.from(cityMap.values());
    response(res, [...uniqueCities], null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllEvents,
  getAllEventsPublish,
  getFeaturedEvents,
  getUpcomingEvents,
  getEventById,
  getEventPublishById,
  create,
  update,
  updateGeneralData,
  updatePlaceData,
  updateLocalitiesData,
  searchEvents,
  searchEventsPublish,
  getCitiesEvents,
};
