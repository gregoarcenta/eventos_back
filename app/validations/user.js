const User = require("../models/User");

module.exports = {
  registerSchema: {
    name: {
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "The name is required",
    },
    surname: {
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "The surname is required",
    },
    email: {
      notEmpty: {
        errorMessage: "The email is required",
      },
      isEmail: {
        errorMessage: "El email is invalid",
      },
      custom: {
        options: (value) => {
          return User.findOne({ where: { email: value } }).then((user) => {
            if (user) throw new Error("The email is already in use");
          });
        },
      },
    },
    username: {
      notEmpty: {
        errorMessage: "The username is required",
      },
      custom: {
        options: (value) => {
          return User.findOne({ where: { username: value } }).then((user) => {
            if (user)
              throw new Error(`The username ${value} is already in use`);
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
        options: { min: 6 },
        errorMessage: "Password must have a minimum of 6 digits",
      },
    },
  },
  authSchema: {
    username: {
      notEmpty: {
        errorMessage: "The username is required",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "The password is required",
      }
    },
  },
};
