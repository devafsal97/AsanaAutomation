const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const escalationController = require("../controller/EscalationController");
const requireAuth = require("../middleware/requireAuth");

router.get("/:id", requireAuth([roles.USER]), escalationController.getById);

router.get(
  "/",
  requireAuth([roles.USER]),
  escalationController.getEscalationContacts
);

router.put("/", requireAuth([roles.USER]), escalationController.update);

router.post("/", requireAuth([roles.USER]), escalationController.create);

module.exports = router;
