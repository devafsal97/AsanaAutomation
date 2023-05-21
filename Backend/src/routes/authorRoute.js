const express = require("express");
const router = express.Router();
const roles = require("../constants/roles");
const authorController = require("../controller/AuthorController");
const checkAccessToken = require("../middleware/requireAuth");

router.get(
  "/authors/:id",
  checkAccessToken.requireAuth(roles),
  authorController.getById
);

router.get(
  "/authors",
  checkAccessToken.requireAuth(roles),
  authorController.getAuthors
);

router.put(
  "/authors/:id",
  checkAccessToken.requireAuth(roles),
  authorController.update
);

router.post(
  "/authors",
  checkAccessToken.requireAuth(roles),
  authorController.create
);

module.exports = router;
