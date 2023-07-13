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
const localities = require("./routes/localities.routes");
const provinces = require("./routes/provinces.routes");
const contact = require("./routes/contact.routes");
const events = require("./routes/event.routes");
const cities = require("./routes/city.routes");
const user = require("./routes/user.routes");
const upload = require("./routes/upload.routes");
const places = require("./routes/place.routes");

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/login", sessions);
app.use("/register", register);
app.use("/user", user);
app.use("/recover", password);
app.use("/events", events);
app.use("/contact", contact);
app.use("/documents", documents);
app.use("/services", services);
app.use("/localities", localities);
app.use("/provinces", provinces);
app.use("/cities", cities);
app.use("/places", places);
app.use("/upload", upload);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto:${port}`));
