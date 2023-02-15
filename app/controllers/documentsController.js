const { response } = require("../middlewares/responseMiddleware");
const Document = require("../models/Document");

async function getAllDocuments(req, res, next) {
  try {

    const documents = await Document.findAll({})

    response(res, documents, null)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllDocuments,
};
