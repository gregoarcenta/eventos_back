const User = require("../models/User");

module.exports = {
  registerSchema: {
    name: {
      toUpperCase: true,
      notEmpty: true,
      trim: true,
      errorMessage: "El nombre es requerido",
    },
    surname: {
      toUpperCase: true,
      notEmpty: true,
      trim: true,
      errorMessage: "El apellido es requerido",
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "El correo electronico es requerido",
      },
      isEmail: {
        errorMessage: "El formato del correo electronico no es valido",
      },
      custom: {
        options: (value) => {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user) throw new Error("El correo electronico ya esta en uso");
          });
        },
      },
    },
    username: {
      trim: true,
      notEmpty: {
        errorMessage: "El nombre de usuario es requerido",
      },
      custom: {
        options: (value) => {
          return User.findOne({ where: { username: value } }).then((user) => {
            if (user)
              throw new Error(`El usuario ${value} ya se encuentra en uso`);
          });
        },
      },
    },
    password: {
      /* isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
      }, */
      trim: true,
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener un minimo 8 digitos",
      },
    },
  },
  updateSchema: {
    name: {
      toUpperCase: true,
      notEmpty: true,
      trim: true,
      errorMessage: "El nombre es requerido",
    },
    surname: {
      toUpperCase: true,
      notEmpty: true,
      trim: true,
      errorMessage: "El apellido es requerido",
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "El correo electronico es requerido",
      },
      isEmail: {
        errorMessage: "El formato del correo electronico no es valido",
      },
      custom: {
        options: (value, { req }) => {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user && user.id !== req.user.id)
              throw new Error("El correo electronico ya esta en uso");
          });
        },
      },
    },
    username: {
      trim: true,
      notEmpty: {
        errorMessage: "El nombre de usuario es requerido",
      },
      custom: {
        options: (value, { req }) => {
          return User.findOne({ where: { username: value } }).then((user) => {
            if (user && user.id !== req.user.id)
              throw new Error(`El usuario ${value} ya se encuentra en uso`);
          });
        },
      },
    },
    age: {
      isInt: true,
      notEmpty: true,
      errorMessage: "La edad es requerida",
    },
    phone: {
      isInt: true,
      isLength: {
        errorMessage: "El telefono debe contener 10 digitos",
        options: { min: 10, max: 10 },
      },
      notEmpty: true,
      errorMessage: "El telefono es requerido",
    },
    document_id: {
      isInt: true,
      notEmpty: true,
      errorMessage: "El tipo de documento es requerido",
    },
    num_document: {
      isInt: true,
      isLength: {
        errorMessage: "El documento debe estar entre 10 y 13 digitos",
        options: { min: 10, max: 13 },
      },
      notEmpty: {
        errorMessage: "El numero de documento es requerido",
      },
      custom: {
        options: (value, { req }) => {
          return User.findOne({ where: { num_document: value } }).then(
            (user) => {
              if (user && user.id !== req.user.id)
                throw new Error(`El documento ${value} ya se encuentra en uso`);
            }
          );
        },
      },
    },
  },
  updateImgProfileSchema: {
    img: {
      notEmpty: true,
      trim: true,
      errorMessage: "La imagen es requerida",
    }
  },
  authSchema: {
    username: {
      trim: true,
      notEmpty: {
        errorMessage: "El usuario o correo electronico es requerido",
      },
    },
    password: {
      trim: true,
      notEmpty: {
        errorMessage: "La contraseña es requerida",
      },
    },
  },
};
