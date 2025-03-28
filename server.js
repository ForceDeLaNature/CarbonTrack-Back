const { createServer } = require("node:http");
const express = require("express");
const bodyParser = require("body-parser");
const routerAuth = require("./src/routes/auth.routes");
const getDistance = require("./src/routes/api.routes");
const routeGetCarbonne = require('./src/routes/transport.router');
const path = require("path");
require("dotenv").config();

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

const server = createServer(app);
// Route de base
// app.use("/", (req, res) => {
//   res("Hello world"); // Correction ici, on utilise res.send() pour envoyer une réponse
// });


app.use("/api/auth", routerAuth);
app.use("/api/getDistance", getDistance);

app.use('/api/getCarbonne', routeGetCarbonne);


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
