const express = require('express');

const twilio = require('twilio')

const router = express.Router();

const apiController = require('../controller/apis');

router.post('/status-callback',apiController.getCallEvents);

module.exports = router;


