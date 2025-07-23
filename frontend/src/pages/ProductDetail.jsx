import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${slug}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  const {
    title,
    image,
    hoverImage,
    price,
    originalPrice,
    stock,
    rating,
    reviewCount,
    description,
  } = product;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="aspect-square overflow-hidden rounded-xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>
        {rating && (
          <div className="flex items-center gap-2 text-yellow-500 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>
        )}

        <div className="mb-4">
          {originalPrice && <p className="text-gray-500 line-through">₹{originalPrice}</p>}
          <p className="text-xl font-bold">₹{price}</p>
        </div>

        <p className="mb-4 text-sm text-gray-600">{description || "No description provided."}</p>

        <p className={`mb-4 text-sm font-medium ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>

        <button
          className="bg-[#234946] text-white px-5 py-2 rounded hover:bg-[#1b3736]"
          disabled={stock === 0}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
