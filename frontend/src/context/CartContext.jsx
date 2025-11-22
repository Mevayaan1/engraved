import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from backend
  useEffect(() => {
    if (!token) return;
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [token]);


  const addToCart = async (productId, quantity = 1) => {
    console.log("clicked add");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.products);
      toast.success("Product added to cart 🛒");
      console.log("✅ Product added to cart:", productId, "x", quantity);
      console.log("🛒 Updated cart:", res.data.products);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/login"); // token expired
    }
  };

   const clearCart = () => {
    setCart([]);
     // <--- Clears the entire cart
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.products);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
