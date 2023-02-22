const User = require("../models/User");

module.exports = {
  recoverSchema: {
    email: {
      trim:true,
      notEmpty: {
        errorMessage: "El correo electronico es requerido",
      },
      isEmail: {
        errorMessage: "El formato del correo electronico ingresado no es valido",
      },
      custom: {
        options: (value) => {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (!user) throw new Error("El correo electronico ingresado no existe ");
          });
        },
      },
    },
  },
  resetPasswordSchema: {
    password: {
      trim:true,
      notEmpty: {
        errorMessage: "La contraseña es requerida",
      },
      /* isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
      }, */
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener un minimo de 8 digitos",
      },
    },
  },
};
