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
const user = require("./routes/user.routes");
const { notFound, errorHandler } = require("./app/middlewares/errorMiddleware");

// Configuration
const app = express();
const port = process.env.PORT;

// Connect Database
connect();
syncTables();

// Connect Send Mail
verifyMail();

// CORS Config
let allowlist;
if (process.env.NODE_ENV === "development") {
  app.use(cors())
} else {
  allowlist = [process.env.URL, process.env.URL_ADMIN];
  const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };
  app.use(cors(corsOptionsDelegate));
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
