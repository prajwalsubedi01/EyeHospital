const express = require("express");
const { loginAdmin, createAdmin } = require("../controllers/adminControllers");
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/create", createAdmin); 

module.exports = router;
