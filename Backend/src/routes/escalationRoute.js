const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const escalationController = require("../controller/EscalationController");
const requireAuth = require("../middleware/requireAuth");

router.get("/escalation/:id", requireAuth(roles), escalationController.getById);

router.get(
  "/escalation",
  requireAuth(roles),
  escalationController.getEscalationContacts
);

router.put("/escalation/:id", requireAuth(roles), escalationController.update);

router.post("/escalation", requireAuth(roles), escalationController.create);

module.exports = router;
