module.exports = {
  changePasswordSchema: {
    password: {
      notEmpty: {
        errorMessage: "La contraseña actual es requerida",
      },
    },
  },
  updatePasswordSchema: {
    password: {
      notEmpty: {
        errorMessage: "La nueva contraseña es requerida",
      },
      isLength: {
        options: { min: 8 },
        errorMessage: "La contraseña debe tener un minimo de 8 digitos",
      },
    },
    password2: {
      notEmpty: {
        errorMessage: "La confirmación de la nueva contraseña es requerida",
      },
      isLength: {
        options: { min: 8 },
        errorMessage: "La confirmación de la nueva contraseña debe tener un minimo de 8 digitos",
      },
      custom: {
        options: (value, { req }) => value === req.body.password,
        errorMessage: "La confirmación de la nueva contraseña no coincide",
      },
    },
  },
};
