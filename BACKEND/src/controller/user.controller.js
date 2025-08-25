import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";
import Notes from "../models/notes.models.js";
import { log } from "console";
import { uploadOnCloudinary } from "../utils/cloudinary/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // const uploadPath = path.resolve("public", "temp");
    // // Ensure directory exists
    // fs.mkdirSync(uploadPath, { recursive: true });
    const uploadPath = path.join(__dirname, "../../public/temp");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log(file);

    const name = Date.now() + "_" + file.originalname;
    return cb(null, name);
  },
});

export const upload = multer({ storage });

// Hash the password
async function convertHash(password) {
  return await bcrypt.hash(String(password), 10);
}

// Check the password
async function checkPassword(password, hashed) {
  return await bcrypt.compare(String(password), hashed);
}

// Sign Up Controller
export const signUp = async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await convertHash(password);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    const token = jwt.sign(
      { ID: newUser._id, email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax", // or 'none' if cross-origin + HTTPS
    });

    return res.status(201).json({
      message: "User created successfully",
      info: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const match = await checkPassword(password, user.password);
      if (match) {
        const token = jwt.sign(
          { ID: user._id, email },
          process.env.JWT_SECRET_KEY
        );
        res.cookie("token", token);
        res.status(200).json({
          message: "Successfully logged in",
          info: { _id: user._id, name: user.name, email: user.email },
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout Failed" });
    console.log(error);
  }
};

// notes store in DB
export const notes = async (req, res) => {
  try {
    console.log("REQ: ", req);
    const notesObj = JSON.parse(req.body.Notes);
    const { semester, description, subject } = notesObj;

    const { path } = req.file;

    console.log("Upload Notes Details: ", semester, description, subject, path);
    const response = await uploadOnCloudinary(path);
    const newNotes = await Notes.create({
      semester,
      description,
      subject,
      link: response.url,
    });
    console.log("Clodinary Response:", response);
    
    res.status(200).json({ message: "file Uploaded Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Notes Stored Error" });
    console.log(error);
  }
};

// get Notes From DB
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    // console.log(notes);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error In Fetching Books" });
  }
};
