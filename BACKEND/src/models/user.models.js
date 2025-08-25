import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: Array,
  },
  orders: {
    type: Array,
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

export default User;