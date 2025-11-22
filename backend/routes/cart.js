import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);

export default router;
