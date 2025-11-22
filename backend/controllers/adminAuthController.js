// controllers/adminAuthController.js
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });
     console.log("Password sent by frontend:", password);
    console.log("Password hash in DB:", admin.password);

    console.log("Email sent by frontend:", email);
    console.log("Email hash in DB:", admin.email);
    console.log("Email matched:", email === admin.email);
console.log("Password plain:", password);
console.log("Password hash:", admin.password);
console.log("Comparing with bcrypt...");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
