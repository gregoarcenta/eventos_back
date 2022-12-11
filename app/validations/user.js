const User = require("../models/User")

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
        errorMessage: "El email es requerido",
      },
      isEmail: {
        errorMessage: 'El email no es válido'
      },
      custom: {
        options: value => {
          return User.findOne({ where: { email: value } })
            .then(user => {
              if (user) throw new Error('El email ya esta en uso')
            })
        }
      }
    },
    username: {
      notEmpty: {
        errorMessage: "El nombre de usuario es requerido",
      },
      custom: {
        options: value => {
          return User.findOne({ where: { username: value } })
            .then(user => {
              if (user) throw new Error(`El nombre de usuario ${value} ya esta en uso`)
            })
        }
      }
    },
    password: {
      /* isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
      }, */
      isLength: {
        options: { min: 6 },
        errorMessage: "La contraseña debe tener mínimo 6 digitos",
      },
    },
  }
}  