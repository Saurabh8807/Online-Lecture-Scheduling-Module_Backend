const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: false,
  },
  level: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  description: {
    type: String,
    required: true,
    min: 8,
  },
  image: {
    public_id :{
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
});

module.exports = mongoose.model("Course", CourseSchema);
