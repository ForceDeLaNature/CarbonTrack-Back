const { createServer } = require("node:http");
const express = require("express");
const bodyParser = require("body-parser");
const routerAuth=require("./src/routes/auth.routes")
const getDistance=require("./src/routes/api.routes")


const path = require("path");
require("dotenv").config();

const hostname = "127.0.0.1";
const port = 3000;
const app = express();

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));


const server = createServer(app);

app.use("/api/auth",routerAuth);
app.use("/api/getDistance",getDistance);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
