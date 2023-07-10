const roles = require("./roles");
const localidades = require("./localidades");
const documents = require("./documents");
const services = require("./services");
const provinces = require("./provinces");
const cities = require("./cities");
const { places } = require("./place");

const catalogs = [
  { name: "roles", data: roles },
  { name: "documents", data: documents },
  { name: "services", data: services },
  { name: "provinces", data: provinces },
  { name: "cities", data: cities },
  { name: "localities", data: localidades },
  { name: "places", data: places },
];
module.exports = catalogs;
