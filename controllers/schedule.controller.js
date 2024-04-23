const CourseSchedule = require("../models/schedule.model");

module.exports.addSchedule = async (req, res, next) => {
  try {
    const { course, lecture, date, instructor, location } = req.body;

    const newSchedule = new CourseSchedule({
      course,
      lecture,
      date: new Date(date),
      instructor,
      location,
    });

    const savedSchedule = await newSchedule.save();

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getSchedule = async (req, res, next) => {
  try {
    const { courseName } = req.query;

    if (!courseName) {
      return res.status(400).json({ error: "Course name is required." });
    }

    const schedules = await CourseSchedule.find({ course: courseName });

    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getUserSchedule = async (req, res, next) => {
  try {
    const { currUser } = req.query;
    if (!currUser) {
      return res.status(400).json({ error: "No user is here! To display" });
    }

    const schedules = await CourseSchedule.find({ instructor: currUser });

    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.checkAvailable = async (req, res, next) => {
  const { username, date } = req.body;

  try {
    const existingSchedule = await CourseSchedule.findOne({
      instructor: username,
      date: new Date(date),
    });

    if (existingSchedule) {
      return res
        .status(409)
        .json({ error: "Instructor is already busy on this date." });
    }

    return res
      .status(200)
      .json({ message: "Instructor is available on this date." });
  } catch (error) {
    console.error("Error checking instructor availability:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
