import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
