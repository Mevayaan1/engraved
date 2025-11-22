import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", auth, (req, res) => {
  res.json({ msg: `Hello ${req.user.id}, your role is ${req.user.role}` });
});

export default router;

