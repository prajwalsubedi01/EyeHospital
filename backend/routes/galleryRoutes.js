const express = require("express");
const {
  createPhoto,
  getPhotos,
  updatePhoto,
  deletePhoto,
} = require("../controllers/galleryControllers");

// ✅ Use existing upload middleware
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getPhotos);
router.post("/", upload.single("image"), createPhoto);
router.put("/:id", upload.single("image"), updatePhoto);
router.delete("/:id", deletePhoto);

module.exports = router;
