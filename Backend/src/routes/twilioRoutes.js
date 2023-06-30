const express = require("express");

const router = express.Router();

const twilioController = require("../controller/TwilioController");

const plivoController = require("../controller/PlivoController");

router.post("/status-callback", twilioController.getCallEvents);

router.post("/answer-url", plivoController.answerUrl);
router.post("/hangup-url", plivoController.hangupUrl);
router.post("/hangup-url", plivoController.fallbackUrl);

module.exports = router;
