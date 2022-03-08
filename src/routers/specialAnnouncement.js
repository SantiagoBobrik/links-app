const { Router } = require("express");

const router = Router();
const multer = require("multer");
const upload = multer();

const specialAnnouncementController = require("../controllers/specialAnnouncementController");

const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  isMongoId,
  validateSpecialAnnouncement,
} = require("../middlewares/validator.js");

router.get(
  "/:_id",
  [isMongoId, isAuthenticated],
  specialAnnouncementController.get
);

router.post(
  "/",
  [upload.single("image"), validateSpecialAnnouncement],
  specialAnnouncementController.create
);

router.put(
  "/:_id",
  [isMongoId, isAuthenticated, validateSpecialAnnouncement],
  specialAnnouncementController.update
);

router.delete(
  "/:_id",
  [isMongoId, isAuthenticated],
  specialAnnouncementController.deleteSpecialAnnouncement
);

module.exports = router;
