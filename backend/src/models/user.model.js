import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "CONTRIBUTOR"],
    default: "CONTRIBUTOR",
  },
  status: {
    type: Boolean,
    default: false,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reference",
    },
  ],
});

//hashing password before save to database
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error.message);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
