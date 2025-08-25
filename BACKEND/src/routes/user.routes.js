import express from "express";
import { logout, signUp, login, upload, notes, getNotes } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", verifyToken, (req, res) => {
  res.status(200).json({ message: "authorized" });
});
router.post("/upload", upload.single('file'), notes);

router.get("/api/notes", getNotes);
export default router;
