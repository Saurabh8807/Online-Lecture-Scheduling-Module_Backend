const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("../utils/cloudinary");
const {
  addCourse,
  getCourse,
  getCourseName,
} = require("../controllers/course.controller");

router.post("/addcourse",upload.single("image"), addCourse);
router.get("/getcourse", getCourse);
router.get("/getcoursename/:courseId", getCourseName);

module.exports = router;
