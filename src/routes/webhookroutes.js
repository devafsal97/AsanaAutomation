const express = require('express');

const router = express.Router();

const webhookComtroller = require('../controller/webhook');

router.post('/change-section',webhookComtroller.setionChange_Post)

router.post('/registerwebhooke',webhookComtroller.create_task_emer_post)

module.exports = router;