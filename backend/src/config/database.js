import mongoose from "mongoose";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Reference from "../models/reference.model.js";
import referencesJSON from "../dummy/references.json" with {type: "json"};
import coursesJSON from "../dummy/courses.json" with {type: "json"};

export const initDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("Success connect to mongodb");

    const user = await User.create(
      [
        {
          _id: "690589cbd06ecd1cd9373204",
          fullName: "fadil",
          email: "fadil@gmail.com",
          password: "Secret1#",
          role: "ADMIN",
          status: true,
        },
      ],
    );
    const course = await Course.insertMany(coursesJSON);
    const reference = await Reference.insertMany(referencesJSON);

    console.log({ user, course, reference });
  } catch (error) {
    console.log(error);
  }
};
