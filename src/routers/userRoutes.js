const { Router } = require("express");
const router = Router();
const multer = require("multer");
const upload = multer();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { isMongoId, validateUser } = require("../middlewares/validator.js");

router.get("/:_id", [isMongoId, isAuthenticated], userController.get);

router.post(
  "/",
  [upload.single("avatar"), validateUser],
  userController.create
);

router.get("/:_id/profile", isAuthenticated, userController.getProfile);
router.put("/:_id", [isMongoId, isAuthenticated], userController.update);

router.delete("/:_id", [isMongoId, isAuthenticated], userController.deleteUser);

router.get("/:_id/links", isMongoId, userController.getLinks);

module.exports = router;
