// backend/controllers/productController.js
import Product from "../models/Product.js"; // ✅ FIX THIS if not present

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ featured: true }).limit(3);
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ THIS FUNCTION IS IMPORTANT!
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
