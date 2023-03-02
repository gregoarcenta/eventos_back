// Global Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import config mail
const { verifyMail } = require("./config/mailer");

// Import connect database
const { connect, syncTables } = require("./config/db");
require("./config/associations");

// Imports routes
const sessions = require("./routes/sessions.routes");
const register = require("./routes/register.routes");
const password = require("./routes/password.routes");
const jenkins = require("./routes/jenkins.routes");
const documents = require("./routes/document.routes");
const services = require("./routes/services.routes");
const provinces = require("./routes/provinces.routes");
const cities = require("./routes/city.routes");
const user = require("./routes/user.routes");

const { notFound, errorHandler } = require("./app/middlewares/errorMiddleware");

const {
  validateDomains,
} = require("./app/middlewares/authorizationMiddleware");

// Configuration
const app = express();
const port = process.env.PORT;

// Connect Database
connect();
syncTables();

// Connect Send Mail
verifyMail();

// CORS Config
app.use(cors());

// Routes build jenkins
app.use("/jenkins", jenkins);

if (process.env.NODE_ENV === "production") {
  app.use("/*", validateDomains);
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/login", sessions);
app.use("/register", register);
app.use("/user", user);
app.use("/recover", password);
app.use("/documents", documents);
app.use("/services", services);
app.use("/provinces", provinces);
app.use("/cities", cities);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto:${port}`));
