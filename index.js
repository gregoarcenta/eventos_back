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
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto:${port}`));
