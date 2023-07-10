const places = [
  { id: "10000", name: "Estadio Jocay" },
  { id: "10001", name: "Plaza Cívica" },
  { id: "10002", name: "Estadio Reales Tamarindos" },
  { id: "10003", name: "Micro Teatro GYE" },
  { id: "10004", name: "Teatro Sánchez Aguilar" },
  { id: "10005", name: "Teatro Centro de Arte" },
  { id: "10006", name: "Coliseo Voltaire Paladines Polo" },
  { id: "10007", name: "Estadio Modelo Alberto Spencer Herrera" },
  { id: "10008", name: "Estadio Arenas de Samborondón" },
  { id: "10009", name: "Estadio Olímpico Atahualpa" },
  { id: "10010", name: "Coliseo General Rumiñahui" },
  { id: "10011", name: "Teatro Nacional Sucre" },
  { id: "10012", name: "Casa de la Música" },
  { id: "10013", name: "Teatro Nacional de la Casa de la Cultura Ecuatoriana" },
  { id: "10014", name: "Estadio Rodrigo Paz Delgado (Casa Blanca)" },
  { id: "10015", name: "Plaza Foch" },
  { id: "10016", name: "Teatro México" },
];

const directions = [
  {
    id: "10000",
    description:
      "El estadio Jocay es un estadio de fútbol de Ecuador. Fue inaugurado el 14 de enero de 1962 con el nombre de estadio Modelo de Manta, que luego fue cambiado al nombre actual. Es utilizado para competiciones de fútbol.",
    reference: "Avenida 113 y Calle 307",
    lat: "-0.963812",
    lng: "-80.702696",
    province_id: "13",
    city_id: "142",
    place_id: 10000,
  },

  {
    id: "10001",
    description:
      "La Plaza Cívica de Manta, es aquel escenario dentro de la ciudad de Manta, en el cual se llevan a cabo diferentes actos como: ferias artesanales para llamar la atención del turista, aquí se exponen artesanías de las diferentes regiones del Ecuador y también se desarrollan diferentes eventos artísticos y culturales.",
    reference: "Av. Malecón",
    lat: "-0.945474",
    lng: "-80.722514",
    province_id: "13",
    city_id: "142",
    place_id: 10001,
  },

  {
    id: "10002",
    description:
      "El Estadio Reales Tamarindos es un estadio que es usado mayoritariamente para la práctica del fútbol. Su capacidad es de aproximadamente 21 000 espectadores.",
    reference: "Avenida José María y Calle César Chávez Cañarte",
    lat: "-1.048253",
    lng: "-80.453564",
    province_id: "13",
    city_id: "135",
    place_id: 10002,
  },

  {
    id: "10003",
    description:
      "Micro Teatro GYE surge de la necesidad de crear un circuito de salas alternativas en Guayaquil.",
    reference: "Avenida 9 de Octubre, Malecón del Salado",
    lat: "-2.187210",
    lng: "-79.898257",
    province_id: "9",
    city_id: "75",
    place_id: 10003,
  },

  {
    id: "10004",
    description:
      "El Teatro Sánchez Aguilar es uno de los teatros más representativos del Ecuador. El teatro fue inaugurado en el año 2012 con el objetivo de impulsar el desarrollo cultural y artístico del Gran Guayaquil. La obra fue ideada y gestionada por la Fundación Sánchez Aguilar.",
    reference: "Km. 1 Av. Rio Esmeraldas, vía a Samborondón",
    lat: "-2.142281",
    lng: "-79.867280",
    province_id: "9",
    city_id: "75",
    place_id: 10004,
  },

  {
    id: "10005",
    description:
      "El Teatro Centro de Arte León Febres-Cordero (TCA) es el teatro principal de la ciudad de Guayaquil. El aforo del Teatro Principal es de 869 butacas: 578 en la platea baja y 291 en la platea alta.",
    reference: "Km 4.5, Av. Pdte. Carlos Julio Arosemena Tola",
    lat: "-2.161247",
    lng: "-79.926402",
    province_id: "9",
    city_id: "75",
    place_id: 10005,
  },

  {
    id: "10006",
    description:
      "El Coliseo Voltaire Paladines Polo, también conocido como Coliseo Cerrado. Fue inaugurado el 30 de mayo de 1963 con el nombre de Coliseo Cerrado de Deportes Guayaquil. El 8 de abril de 1983 tomó el nombre de Voltaire Paladines Polo, en memoria de un dirigente de la FedeGuayas.",
    reference: "Avenidas de Las Américas y Kennedy",
    lat: "-2.179658",
    lng: "-79.893555",
    province_id: "9",
    city_id: "75",
    place_id: 10006,
  },

  {
    id: "10007",
    description:
      "El Estadio Modelo Alberto Spencer, conocido más comúnmente como el Modelo, es un estadio multiuso situado en la ciudad de Guayaquil, Ecuador. Recibe su nombre en honor al exjugador ecuatoriano de fútbol apodado Cabeza Mágica Alberto Spencer. Es inaugurado oficialmente el 24 de julio de 1959 y tiene una capacidad para 42 000 espectadores.",
    reference: "Avenidas de Las Américas y Kennedy",
    lat: "-2.179282",
    lng: "-79.894285",
    province_id: "9",
    city_id: "75",
    place_id: 10007,
  },

  {
    id: "10008",
    description:
      "El estadio Samborondón Arena es un estadio multiusos. Está ubicado en la ciudad de Samborondón, provincia de Guayas. Fue inaugurado en el año 2006. Es usado para la práctica del fútbol, Tiene capacidad para 2200 espectadores.",
    reference: "Samborondón",
    lat: "-1.963383",
    lng: "-79.729364",
    province_id: "9",
    city_id: "89",
    place_id: 10008,
  },

  {
    id: "10009",
    description:
      "Ubicado en Quito, es un estadio deportivo que también alberga eventos masivos, incluyendo conciertos.",
    reference: "Av. 6 de Diciembre y Naciones Unidas",
    lat: "-0.177779",
    lng: "-78.476463",
    province_id: "17",
    city_id: "178",
    place_id: 10009,
  },

  {
    id: "10010",
    description:
      "Situado en la ciudad de Sangolquí, es un coliseo deportivo y escenario para eventos y conciertos.",
    reference: "Calle El Tejar y General Rumiñahui",
    lat: "-0.213519",
    lng: "-78.490661",
    province_id: "17",
    city_id: "178",
    place_id: 10010,
  },

  {
    id: "10011",
    description:
      "Es un teatro emblemático en Quito que se utiliza para presentaciones teatrales, musicales y eventos culturales.",
    reference: "Calle Manabí y García Moreno",
    lat: "-0.219218",
    lng: "-78.508940",
    province_id: "17",
    city_id: "178",
    place_id: 10011,
  },

  {
    id: "10012",
    description:
      "Es un espacio cultural en Quito que se dedica a promover la música en vivo y alberga conciertos y eventos musicales de diversos géneros.",
    reference: "Calle Valderrama N24-89 y Av. Mariana de Jesús",
    lat: "-0.181213",
    lng: "-78.502464",
    province_id: "17",
    city_id: "178",
    place_id: 10012,
  },

  {
    id: "10013",
    description:
      "Ubicado en Quito, es un importante escenario cultural que acoge diversos eventos, incluyendo conciertos, presentaciones teatrales y exposiciones.",
    reference: "Avenida 6 de Diciembre N16-224 y Patria",
    lat: "-0.210993",
    lng: "-78.494908",
    province_id: "17",
    city_id: "178",
    place_id: 10013,
  },

  {
    id: "10014",
    description:
      "El Estadio Rodrigo Paz Delgado, también conocido como Estadio Casa Blanca, es un estadio de fútbol en Quito, que ha sido utilizado para grandes conciertos y eventos masivos.",
    reference: "Av. Diego de Vásquez y Queri",
    lat: "-0.107929",
    lng: "-78.489115",
    province_id: "17",
    city_id: "178",
    place_id: 10014,
  },

  {
    id: "10015",
    description:
      "Situada en el barrio La Mariscal de Quito, es conocida por su vida nocturna y alberga varios bares y locales que a menudo presentan música en vivo y eventos temáticos",
    reference:
      "Calles Reina Victoria y Calama, en el barrio La Mariscal de Quito.",
    lat: "-0.202958",
    lng: "-78.491088",
    province_id: "17",
    city_id: "178",
    place_id: 10015,
  },

  {
    id: "10016",
    description:
      "Ubicado en la ciudad de Machachi, es un teatro histórico que también acoge presentaciones teatrales, conciertos y eventos culturales.",
    reference: "Calle 10 de Agosto y Sucre",
    lat: "-0.240128",
    lng: "-78.516351",
    province_id: "17",
    city_id: "178",
    place_id: 10016,
  },
];
module.exports = {
  places,
  directions,
};
