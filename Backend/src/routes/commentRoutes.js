const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const commentController = require("../controller/CommentController");
const requireAuth = require("../middleware/requireAuth");

router.get("/:id", requireAuth([roles.USER]), commentController.getById);

router.get("/", requireAuth([roles.USER]), commentController.getComments);

router.put("/", requireAuth([roles.USER]), commentController.update);

router.post("/", requireAuth([roles.USER]), commentController.create);

module.exports = router;
