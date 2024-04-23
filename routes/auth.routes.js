const express = require("express");
const router = express.Router();

const {
  register,
  login,
  allInstructors,
  logOut,
  getUserSchedule,
  checkAvailable,
  getInstructorByUsername, // Add this line
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);
router.get("/instructor/:username", getInstructorByUsername); // Add this line

module.exports = router;
