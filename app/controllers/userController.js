const { response } = require("../middlewares/responseMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const User = require("../models/User");
const { verifyMail } = require("../utils/sendMail");
const { excludeFieldsUser } = require("../utils/utils");
const { Op, Sequelize } = require("sequelize");

async function find(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [Role],
    });
    if (!user) {
      req.user = user;
      return next();
    }

    // Valida si tiene verificado el email
    if (!user.email_verif) {
      res.status(401);
      throw new Error("Tu cuenta aun no está verificada");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { password, ...body } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create(
      { ...body, password: hash, role_id: 2 },
      {
        fields: ["name", "surname", "email", "username", "password", "role_id"],
      }
    );
    const token = jwt.sign({ id: user.id }, process.env.JWT_MAIL_VERIF, {
      expiresIn: "3h",
    });
    const responseMail = await verifyMail(token, user.email);
    if (responseMail.accepted.length === 0) {
      await User.destroy({ where: { id: user.id } });
      throw new Error("Ocurrio un error durante el registro");
    }
    response(res, null, "Cuenta creada con exito!", 201);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    if (!req.user) {
      res.status(422);
      throw new Error("El usuario que intentas actualizar no existe");
    }
    const business_name = req.body.business_name?.trim().toUpperCase();

    if (req.body.document_id == 2 && !business_name) {
      res.status(400);
      throw new Error("La razón social es requerida");
    }

    if (req.body.document_id == 2 && business_name) {
      req.body = { ...req.body, business_name };
    } else {
      req.body = { ...req.body, business_name: null };
    }

    await User.update(
      { ...req.body },
      {
        where: { id: req.user.id },
        fields: [
          "name",
          "surname",
          "email",
          "username",
          "img",
          "age",
          "phone",
          "num_document",
          "document_id",
          "business_name",
        ],
      }
    );

    const user = await User.findOne({
      where: { id: req.user.id },
    });

    response(
      res,
      excludeFieldsUser(user.toJSON()),
      "Tus datos han sido actualizados exitosamente!"
    );
  } catch (error) {
    next(error);
  }
}

async function updateImgProfile(req, res, next) {
  try {
    if (!req.user) {
      res.status(422);
      throw new Error(
        "El usuario en el que intentas actualizar la imagen no existe"
      );
    }
    const { img } = req.body;
    await User.update({ img }, { where: { id: req.user.id }, fields: ["img"] });
    const user = await User.findOne({ where: { id: req.user.id } });
    response(
      res,
      excludeFieldsUser(user.toJSON()),
      "Imagen de perfil actualizada"
    );
  } catch (error) {
    next(error);
  }
}

async function getUserByEmail(req, res, next) {
  const email = req.params.email;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      response(res, { valid: false }, null);
    } else {
      response(res, { valid: true }, null);
    }
  } catch (error) {
    next(error);
  }
}

async function getUserByDocument(req, res, next) {
  const num_document = req.params.num_document;
  try {
    const user = await User.findOne({ where: { num_document } });
    if (user) {
      response(res, { valid: false }, null);
    } else {
      response(res, { valid: true }, null);
    }
  } catch (error) {
    next(error);
  }
}

async function getUserByUsername(req, res, next) {
  const username = req.params.username;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      response(res, { valid: false }, null);
    } else {
      response(res, { valid: true }, null);
    }
  } catch (error) {
    next(error);
  }
}

async function getUsersByUsernameOrName(req, res, next) {
  const { term } = req.body;
  const fragmentoBusqueda = `%${term}%`;
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            [Op.or]: [
              Sequelize.literal("unaccent(name || ' ' || surname) ILIKE unaccent(:searchTerm)"),
              Sequelize.literal("unaccent(surname || ' ' || name) ILIKE unaccent(:searchTerm)"),
            ],
          },
          {
            username: {
              [Op.iLike]: fragmentoBusqueda,
            },
          },
        ],
      },
      replacements: {
        searchTerm: fragmentoBusqueda,
      },
    });

    const newUsers = users.map((user) => excludeFieldsUser(user.toJSON()));
    response(res, newUsers, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  find,
  create,
  update,
  updateImgProfile,
  getUserByEmail,
  getUserByDocument,
  getUserByUsername,
  getUsersByUsernameOrName,
};
