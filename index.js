const express = require("express");
const path = require("path");

// Imports routes
const sessions = require("./routes/sessions.routes");

// Configuration
const app = express();
const port = process.env.PORT || 3000;

// app.get('*', (req, res) => {
//   res.sendFile(`index.html`, { root: www });
// });

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
app.use("/doc-curricular", curricular);
app.use(notFound);
app.use(errorHandler); */

app.listen(port, () => console.log(`Servidor iniciado en el puerto:${port}`));
