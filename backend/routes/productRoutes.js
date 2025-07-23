// backend/routes/productRoutes.js
import express from "express";
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:slug", getProductBySlug);
router.post("/", createProduct); // ✅ this was commented, now fixed

export default router;
