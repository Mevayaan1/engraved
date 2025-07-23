import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import "./index.css";
import Furniture from "./pages/Furniture";
import Shop from "./pages/Shop";import AdminDashboard from "./admin/pages/AdminDashboard";


function App() {
  return (
    <div data-theme="amarts">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
