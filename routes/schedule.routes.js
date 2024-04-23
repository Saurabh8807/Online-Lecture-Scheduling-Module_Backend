const express = require("express");
const router = express.Router();
const {
  addSchedule,
  getSchedule,
  getUserSchedule,
  checkAvailable,
} = require("../controllers/schedule.controller");

router.post("/addschedule", addSchedule);
router.get("/getschedule", getSchedule);
router.get("/getuserschedule", getUserSchedule);
router.post("/checkInstructorAvailability", checkAvailable);

module.exports = router;
