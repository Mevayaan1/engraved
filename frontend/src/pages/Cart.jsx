import React from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      title: "Slim Fit Casual Shirt",
      desc: "Button-Down Collar & Placket",
      price: 85,
      size: "XL",
      color: "Maroon",
      quantity: 1,
      image: "https://images.pexels.com/photos/10545937/pexels-photo-10545937.jpeg",
    },
    {
      id: 2,
      title: "Printed Straight Kurtas",
      desc: "Digital Printed With Yoke Embroidered",
      price: 68,
      size: "L",
      color: "Green",
      quantity: 1,
      image: "https://images.pexels.com/photos/10545937/pexels-photo-10545937.jpeg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 35.52;
  const tax = 0;
  const shipping = 0;
  const total = subtotal - discount + tax + shipping;

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#faf6f3]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="md:col-span-2">
            <h1 className="">Cart</h1>
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-6 text-sm font-medium text-gray-600">
              <span className="text-black">1. Cart</span>
              <span>→</span>
              <span>2. Checkout</span>
              <span>→</span>
              <span>3. Payment</span>
            </div>

            {/* Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between shadow-bottom pb-4"
                >
                  {/* Left Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-40 h-40 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="font-semibold mt-1">${item.price}</p>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border rounded-lg">
                      <button className="px-3 py-1">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button className="px-3 py-1">+</button>
                    </div>
                    {/* Remove Button */}
                    <button className="text-gray-500 hover:text-red-500">
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="border-secondary rounded-xl p-6 h-fit bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2 text-sm">
              <span>Sub Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Discount</span>
              <span className="text-green-600">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-[#B0C4C4] text-white py-3 rounded-xl hover:bg-[#234946] mb-3">
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 mb-3">
              Estimated Delivery by{" "}
              <span className="font-medium">25 April, 2022</span>
            </p>

            {/* Coupon */}
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button className="bg-gray-200 px-4 text-sm font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
