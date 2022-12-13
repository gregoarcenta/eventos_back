const User = require("../models/User");

module.exports = {
  recoverSchema: {
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
            if (!user) throw new Error("The email does not exist");
          });
        },
      },
    },
  },
  resetPasswordSchema: {
    password: {
      notEmpty: {
        errorMessage: "The password is required",
      },
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
};
