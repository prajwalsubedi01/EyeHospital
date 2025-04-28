const express = require("express");
const router = express.Router();
const {
    createNotice,
    getNotices,
    updateNotice,
    deleteNotice
} = require("../controllers/noticeControllers");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", getNotices);

// Protected routes (Admin only)
router.post("/", authMiddleware, upload.single("image"), createNotice);
router.put("/:id", authMiddleware, upload.single("image"), updateNotice);
router.delete("/:id", authMiddleware, deleteNotice);

module.exports = router;