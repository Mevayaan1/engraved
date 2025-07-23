import { Link } from "react-router-dom";
import { Star } from "lucide-react"; // For rating stars (lucide-react)

const ProductCard = ({ product }) => {
  const {
    slug,
    title,
    image,
    hoverImage,
    price,
    originalPrice,
    isOnSale,
    rating,
    reviewCount,
    isFrom,
  } = product;

  return (
    <div className="group bg-white rounded-xl p-3 transition hover:shadow-md text-center">
      <Link to={`/products/${slug}`} className="block w-full aspect-square overflow-hidden rounded-md relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt={`${title} alt`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-[#234946] text-white px-3 py-[2px] text-sm rounded-full">
            Sale
          </div>
        )}
      </Link>

      <div className="mt-4">
        <h3 className="text-md font-medium text-[#222]">{title}</h3>

        {/* Rating */}
        {rating && (
          <div className="flex justify-center items-center gap-1 mt-1 text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={16} fill={i < rating ? "#facc15" : "none"} stroke="#facc15" />
              ))}
            <span className="text-sm text-gray-700">({reviewCount})</span>
          </div>
        )}

        {/* Pricing */}
        <div className="mt-2">
          {originalPrice && (
            <p className="text-sm text-gray-500 ">₹ {originalPrice.toLocaleString()} INR</p>
          )}
          <p className="text-md text-black font-semibold ">
            {isFrom ? "From " : ""}
            ₹ {price.toLocaleString()} INR  
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

