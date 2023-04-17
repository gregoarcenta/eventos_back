module.exports = {
  registerEventSchema: {
    name: {
      notEmpty: true,
      trim: true,
      errorMessage: "El nombre del evento es requerido",
    },
    description: {
      notEmpty: true,
      trim: true,
      errorMessage: "La descripcion del evento es requerida",
    },
    img: {
      notEmpty: true,
      trim: true,
      errorMessage: "La imagen es requerida",
    },
    organizer: {
      notEmpty: true,
      trim: true,
      errorMessage: "El nombre del organizador es requerido",
    },
    start_date: {
      notEmpty: true,
      trim: true,
      errorMessage: "La fecha de inicio es requerida",
    },
    start_time: {
      notEmpty: true,
      trim: true,
      errorMessage: "La hora de inicio es requerida",
    },
    end_date: {
      notEmpty: true,
      trim: true,
      errorMessage: "La fecha de fin es requerida",
    },
    end_time: {
      notEmpty: true,
      trim: true,
      errorMessage: "La hora de fin es requerida",
    },
    service_id: {
      notEmpty: true,
      trim: true,
      errorMessage: "El servicio del evento es requerido",
    }
  },
};
