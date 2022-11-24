const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './';
app.use(express.static(www));
console.log(`serving ${www}`);

app.use('/public', express.static(path.join(__dirname, 'public')))

// app.get('*', (req, res) => {
//   res.sendFile(`index.html`, { root: www });
// });

app.listen(port, () => console.log(`Servidor levantado en el puerto:${port}`));
