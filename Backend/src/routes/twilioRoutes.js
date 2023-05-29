const express = require("express");

const router = express.Router();

const twilioController = require("../controller/TwilioController");

router.post("/status-callback", twilioController.getCallEvents);

module.exports = router;
