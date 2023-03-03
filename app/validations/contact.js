const User = require("../models/User");

module.exports = {
  createContactSchema: {
    name: {
      trim: true,
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "El nombre es requerido",
    },
    surname: {
      trim: true,
      toUpperCase: true,
      notEmpty: true,
      errorMessage: "El apellido es requerido",
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "El correo electrónico es requerido",
      },
      isEmail: {
        errorMessage: "El formato del correo electronico no es valido",
      },
    },
    phone: {
      notEmpty: true,
      errorMessage: "El numero de teléfono es requerido",
      trim: true,
      isInt: {
        errorMessage: "El numero de telefono solo puede contener numeros",
      },
      isLength: {
        errorMessage: "El telefono debe contener 10 digitos",
        options: { min: 10, max: 10 },
      },
    },
    city_id:{
      isInt:true,
      notEmpty:true,
      errorMessage:"La ciudad es requerida"
    },
    service_id:{
      isInt:true,
      notEmpty:true,
      errorMessage:"El servicio es requerido"
    }
  },
};
