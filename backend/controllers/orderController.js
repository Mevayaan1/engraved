// controllers/orderController.js
import Order from "../models/Order.js";

// ✅ Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingInfo, totalAmount } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: "No items in order." });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required." });
    }

    // ✅ Map shipping info from frontend form to order schema
    const order = new Order({
      user: req.user.id, // set from verifyToken middleware
      items,
      totalAmount,
      address: {
        fullName: shippingInfo.fullName,
        phone: shippingInfo.phone,
        street: shippingInfo.address,
        city: shippingInfo.city || "",
        state: shippingInfo.state || "",
        postalCode: shippingInfo.postalCode || "",
        country: shippingInfo.country || "India",
      },
      paymentMethod: "COD",
      paymentStatus: "unpaid",
      status: "pending",
    });

    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};

// ✅ Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ✅ Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message, 
    });
  }
};

// ✅ Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "title price images")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

// ✅ Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};
