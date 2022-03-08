const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");
const validatePremiumUser = require("../middlewares/validatePremium");
const { isMongoId, validateLink } = require("../middlewares/validator");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post(
  "/",
  [isAuthenticated, validatePremiumUser, validateLink],
  linkController.create
);

router.get("/:_id", [isMongoId, isAuthenticated], linkController.get);

router.put("/:_id", [isMongoId, isAuthenticated], linkController.update);

router.delete("/:_id", [isMongoId, isAuthenticated], linkController.deleteLink);

module.exports = router;
