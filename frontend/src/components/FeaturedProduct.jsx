// components/FeaturedProducts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

 useEffect(() => {
    axios.get('http://localhost:5000/api/products/featured/? limit=3')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching featured products:", err));
  }, []);

  return (
    <section className="py-12 px-4 md:px-12 bg-[#FAF6F3]">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#3C5A4C]">
          Featured Inlay Pieces
        </h2>
        <p className="text-gray-500 mt-2">Handcrafted with timeless elegance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
