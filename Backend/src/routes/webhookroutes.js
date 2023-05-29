const express = require("express");

const router = express.Router();

const webhookController = require("../controller/WebhokController");

router.post("/change-section", webhookController.setionChange_Post);

router.post("/registerwebhooke", webhookController.create_task_emer_post);

module.exports = router;
