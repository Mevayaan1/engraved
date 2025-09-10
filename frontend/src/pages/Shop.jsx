// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(import.meta.env);
  console.log(`${import.meta.env.VITE_API_BASE_URL}/products`);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/products`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <section className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Shop Our Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {!loading && products.length === 0 && (
            <div className="text-center text-gray-500">No products found.</div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default Shop;
