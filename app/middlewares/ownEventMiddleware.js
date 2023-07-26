const Event = require("../models/Event");
const Role = require("../models/Role");
const User = require("../models/User");

exports.verifyOwnEvent = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(404);
      throw new Error("User Not Found");
    }

    const event = await Event.findOne({where:{id:req.body.eventId}})
    const eventData = event.toJSON()

    if (eventData.user_id !== req.user.id) {
      res.status(403);
      throw new Error("User not authorized not own");
    }

    next();
  } catch (error) {
    next(error);
  }
};