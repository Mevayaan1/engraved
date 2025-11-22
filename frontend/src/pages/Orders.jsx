import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 border-b pb-3 text-sm font-medium">
        {["all", "Pending", "Shipped", "Delivered", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full ${
              filter === tab
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab === "all" ? "All Orders" : tab}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No orders found in this category.
        </div>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl mb-6 p-5 shadow-sm bg-white"
          >
            {/* Header */}
            <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-4">
              <div>
                <p>
                  <span className="font-medium">Order placed:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹{order.totalAmount}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Product Items */}
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item._id} className="flex gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm px-3 py-1 rounded border hover:bg-gray-100">
                      View Item
                    </button>
                    <button className="text-sm px-3 py-1 rounded border hover:bg-gray-100">
                      Buy Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
