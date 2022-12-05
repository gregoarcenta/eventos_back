// Global Imports
const express = require("express");
// const path = require("path");
require("dotenv").config();

// Import connect database
const { connect, syncTables } = require("./config/db");
require("./config/associations");

// Imports routes
const sessions = require("./routes/sessions.routes");
const { notFound, errorHandler } = require("./app/middlewares/errorMiddleware");

// Configuration
const app = express();
const port = process.env.PORT;

// Connect Database
connect();
syncTables();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', express.static(path.join(__dirname, 'public')))

// Routes
app.use("/login", sessions);
/* app.use("/user", users);
app.use("/course", course);
app.use("/student", student);
app.use("/teacher", teacher);
app.use("/institution", institution);
app.use("/doc-curricular", curricular); */
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto:${port}`));
