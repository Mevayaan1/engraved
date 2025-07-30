// import React from 'react';
import React, { useState } from 'react'

function ProductForm() {
      const [product, setProduct] = useState({
    title: "",
    slug: "",
    price: "",
    originalPrice: "",
    material: "",
    category: "",
    stock: 0,
    tag: "",
    isOnSale: false,
    featured: false,
    image: "",
    hoverImage: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setProduct((prev) => ({ ...prev, [field]: data.imageUrl }));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image || !product.hoverImage) {
      alert("Please upload both images before submitting.");
      return;
    }

    if (
      !product.title ||
      !product.slug ||
      !product.price ||
      !product.material ||
      !product.category ||
      !product.image
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      console.log("Submitting product:", product);

      if (res.ok) {
        alert("Product added successfully!");
        setProduct({
          ...product,
          title: "",
          slug: "",
          price: "",
          originalPrice: "",
          material: "",
          category: "",
          stock: 0,
          tag: "",
          image: "",
          hoverImage: "",
          featured: false,
          isOnSale: false,
          isFrom: false,
        });
      } else {
        const errorRes = await res.json();
        alert("❌ Failed to add product: " + (errorRes?.error || "Bad request"));
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  return (
    <>
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
          className="input"
        />
        <input
          name="slug"
          placeholder="Product unique name"
          value={product.slug}
          onChange={handleChange}
          className="input"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="input"
        />
        <input
          name="originalPrice"
          type="number"
          placeholder="Original Price"
          value={product.originalPrice}
          onChange={handleChange}
          className="input"
        />

        <select
          name="material"
          value={product.material}
          onChange={handleChange}
          className="input"
        >
          <option value="">Material</option>
          <option value="Bone">Bone</option>
          <option value="Pearl">Pearl</option>
          <option value="Wood">Wood</option>
          <option value="Stone">Stone</option>
        </select>

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="input"
        >
          <option value="">Category</option>
          <option value="Box">Box</option>
          <option value="Tray">Tray</option>
          <option value="Mirror">Mirror</option>
          <option value="Sideboard">Sideboard</option>
          <option value="Cabinet">Cabinet</option>
        </select>

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="input"
        />
        <input
          name="tag"
          placeholder="Tag (e.g., Sale, New)"
          value={product.tag}
          onChange={handleChange}
          className="input"
        />

        <label className="col-span-2">
          Upload Main Image:
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, "image")}
            className="input"
          />
        </label>
        <label className="col-span-2">
          Upload Hover Image:
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, "hoverImage")}
            className="input"
          />
        </label>

        <label className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="isOnSale"
            checked={product.isOnSale}
            onChange={handleChange}
          />
          On Sale?
        </label>

        <label className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
          />
          Featured?
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="col-span-2 bg-[#234946] text-white py-2 rounded hover:bg-[#1c3a36]"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </>
  )
}

export default ProductForm