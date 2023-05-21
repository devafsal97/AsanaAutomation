const express = require("express");
const roles = require("../constants/roles");

const requireAuth = require("../middleware/requireAuth");

const twilio = require("twilio");

const router = express.Router();

const apiController = require("../controller/apis");

router.post("/status-callback", apiController.getCallEvents);

router.get("/tasks", requireAuth([roles.USER]), apiController.getAllTasks);

router.post("/get-search-result", apiController.getSearchResult);

router.post("/get-selected-task", apiController.getSelectedTask);

router.get("/get-current-author", apiController.getCurrentAuthor);

router.post("/update-current-author", apiController.updateCurrentAuthor);

router.get("/get-escalation-contacts", apiController.getEscalationContacts);

router.post("/post-escalation-contacts", apiController.postEscalationContacts);

module.exports = router;
