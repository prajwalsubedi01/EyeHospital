const express = require("express");
const {
  createPhoto,
  getPhotos,
  deletePhoto,
} = require("../controllers/galleryControllers");

// ✅ Use existing upload middleware
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getPhotos);
router.post("/photo", upload.single("image"), createPhoto);
router.delete("/:id", deletePhoto);

module.exports = router;
