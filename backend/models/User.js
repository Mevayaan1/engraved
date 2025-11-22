import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },

    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1, min: 1 },
        size: { type: String, trim: true },
        color: { type: String, trim: true }
      }
    ],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // optional
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }] // optional
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
