
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  price: {
    type: Number,
    required: true,
  },

  originalPrice: Number,

  isOnSale: {
    type: Boolean,
    default: false,
  },

  isFrom: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  material: {
    type: String,
    enum: ["Bone", "Pearl", "Wood", "Stone"],
    required: true,
  },

  category: {
    type: String,
    enum: ["Box", "Tray", "Mirror", "Sideboard", "Cabinet"],
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  hoverImage: {
    type: String,
  },

  stock: {
    type: Number,
    default: 10,
  },

  tag: {
    type: String,
    enum: ["Sale", "Out of Stock", "New", "Featured", null],
    default: null,
  },

  featured: {
  type: Boolean,
  default: false,
}

});

const Product = mongoose.model("Product", productSchema);
export default Product;
