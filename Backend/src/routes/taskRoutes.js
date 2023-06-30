const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const requireAuth = require("../middleware/requireAuth");
const taslController = require("../controller/TaskController");

// router.get("/:id", requireAuth([roles.USER]), taslController.getById);

router.get("/", requireAuth([roles.USER]), taslController.getTasks);

router.put("/:id", requireAuth([roles.USER]), taslController.update);

router.post("/", requireAuth([roles.USER]), taslController.create);

router.get("/getByDate", requireAuth([roles.USER]), taslController.getByDate);

router.get(
  "/getActiveTaskCount",
  requireAuth([roles.USER]),
  taslController.getTaskAnalytics
);
router.get(
  "/getNewTaskData",
  requireAuth([roles.USER]),
  taslController.getNewTaskData
);
router.get(
  "/getActiveTask",
  requireAuth([roles.USER]),
  taslController.getActiveTask
);

module.exports = router;
