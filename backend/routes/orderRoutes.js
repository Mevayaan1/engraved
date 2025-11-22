// routes/orderRoutes.js
import express from "express";
import { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create new order
router.post("/", verifyToken, createOrder);

// ✅ Get all orders for a user
router.get("/orders", verifyToken, getUserOrders);

// ✅ Get specific order by ID
router.get("/:id", verifyToken, getOrderById);


// Admin routes
router.get("/", verifyToken, getAllOrders);
router.put("/:id/status", verifyToken, updateOrderStatus);


export default router;
