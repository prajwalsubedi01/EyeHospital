const express = require("express");
const { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = require("../controllers/teamControllers");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getTeamMembers); // Get all team members
router.post("/", upload.single("image"), addTeamMember); // Add new member
router.put("/:id", upload.single("image"), updateTeamMember); // Update member
router.delete("/:id", deleteTeamMember); // Delete member

module.exports = router;
