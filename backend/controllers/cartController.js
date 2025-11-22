import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.product",
      "title price images slug"
    );

    res.json(cart || { user: req.user.id, products: [] });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, products: [] });
    }

    const existing = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity,
        size,
        color,
      });
    }

    await cart.save();

    const updated = await Cart.findOne({ user: req.user.id }).populate(
      "products.product",
      "title price images slug"
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.json({ products: [] });

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updated = await Cart.findOne({ user: req.user.id }).populate(
      "products.product"
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
