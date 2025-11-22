import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    // console.log(user?.token)
    if (!token) {
      alert(`${token} , You must be logged in to place an order.`);
      navigate("/login");
      return;
    }

    const localUrl = "http://localhost:5000/api/orders"; // local endpoint only

    try {
      const res = await fetch(localUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // matches verifyToken middleware
        },
        body: JSON.stringify({
          items: cart.map((i) => ({
            product: i.product._id,
            quantity: i.quantity,
            price: i.product.price,  
          })),
          shippingInfo: formData,
          totalAmount: total,
        }), 
      });

      if (!res.ok) throw new Error("Failed to place order");

      clearCart();
      setIsSuccess(true);

      // Auto redirect after success
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Could not place order. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#faf6f3] flex flex-col items-center p-6">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* Left form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              Shipping Information
            </h2>
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
          </div>

          {/* Right Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.product._id} className="flex justify-between mb-2">
                <span>{item.product.title}</span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="bg-[#234946] text-white w-full py-3 mt-6 rounded-xl hover:bg-[#1b3736] transition-all"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {isSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center shadow-lg animate-fadeIn">
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                🎉 Order Placed Successfully!
              </h2>
              <p className="text-gray-600">Redirecting to home...</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Checkout;
