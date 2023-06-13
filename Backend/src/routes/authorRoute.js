const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const authorController = require("../controller/AuthorController");
const requireAuth = require("../middleware/requireAuth");

router.get("/:id", requireAuth([roles.USER]), authorController.getById);

router.get("/", requireAuth([roles.USER]), authorController.getAuthors);

router.put("/:id", requireAuth([roles.USER]), authorController.update);

router.post("/", requireAuth([roles.USER]), authorController.create);

router.delete("/:id", requireAuth([roles.USER]), authorController.deleteAuthor);

module.exports = router;
