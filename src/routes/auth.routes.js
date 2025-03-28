const express = require("express");
const app = express();
const http = require("http").createServer(app);
const router = express.Router();
const {
    registerUser,
loginUser,
}= require("../controllers/auth.controller")

router.post("/register",registerUser);
router.post("/login",loginUser)

module.exports = router