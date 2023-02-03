const User = require("../models/User");

module.exports = {
  registerSchema: {
    name: {
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "El nombre es requerido",
    },
    surname: {
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "El apellido es requerido",
    },
    email: {
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
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener un minimo 8 digitos",
      },
    },
  },
  authSchema: {
    username: {
      notEmpty: {
        errorMessage: "El usuario o correo electronico es requerido",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "La contraseña es requerida",
      },
    },
  },
};
