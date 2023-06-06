const express = require("express");

const router = express.Router();

const webhookController = require("../controller/WebhokController");

router.post("/section-change", webhookController.setionChange_Post);

router.post("/register-webhook", webhookController.create_task_emer_post);

module.exports = router;
