const express = require('express');
const app = express();
const router = express.Router();
const routerGetCarbon = require('../controllers/transport.controller');


router.post('/calculate', routerGetCarbon.getTransportEmissions);

module.exports = router;
   
