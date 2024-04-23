const Course = require("../models/course.model");
const cloudinary = require("cloudinary").v2; // Import cloudinary once

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dflprfziq",
  api_key: "795548623959935",
  api_secret: "jLzubZZuIAbeIRqIc5IiE-40N4Q",
});

// Log Cloudinary connection status
console.log("Cloudinary connected successfully!");

module.exports.addCourse = async (req, res, next) => {
  const { name, level, description } = req.body;
  const image = req.file.path; // Access file data using req.file
  console.log(req.file);
  console.log(req.file.path);

  try {
    console.log(name);
    console.log(image);
    console.log(image);
    const result = await cloudinary.uploader.upload(image, {
      folder: "courseThumbnail",
      // width :300
    });
    console.log("Upload result:", result);
    console.log("Upload result:", JSON.stringify(result, null, 2));

    const newCourse = new Course({
      name,
      level,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const savedCourse = await newCourse.save();

    return res.json({ status: true, savedCourse });
  } catch (error) {
    next(error);
  }
};

module.exports.getCourse = async (req, res, next) => {
  try {
    const courses = await Course.find();
    return res.json({ status: true, courses });
  } catch (error) {
    next(error);
  }
};

module.exports.getCourseName = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.json({ courseName: course.name });
  } catch (error) {
    next(error);
  }
};
