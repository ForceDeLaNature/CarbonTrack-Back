const express = require("express");
const app = express();
const http = require("http").createServer(app);
const router = express.Router();
const { getDistance } = require("../controllers/api.controller");

router.post("/getDistance", getDistance);

module.exports = router;
