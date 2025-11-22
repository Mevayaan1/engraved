import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import "./index.css";
import Furniture from "./pages/Furniture";
import Shop from "./pages/Shop";

import CartPage from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner"; // 👈 shadcn toaster
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders"

import AdminDashboard from "./admin/pages/AdminDashboard";  
import AdminOrders from "./admin/pages/AdminOrders"
import AdminLogin from "./admin/pages/AdminLogin";


function App() {
  return (
    <div data-theme="amarts">
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminOrders/>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/account"
                element={<Profile />}
              />
              <Route path="/orders" element={<Orders />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>

            {/* Toast notification container */}
            <Toaster/>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
