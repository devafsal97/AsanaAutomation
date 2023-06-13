const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const userController = require("../controller/UserController");
const requireAuth = require("../middleware/requireAuth");

router.get("/", requireAuth([roles.USER]), userController.getUsers);

router.get("/:id", requireAuth([roles.USER]), userController.getById);

router.put("/:id", requireAuth([roles.USER]), userController.update);

router.post("/", requireAuth([roles.USER]), userController.create);

module.exports = router;
