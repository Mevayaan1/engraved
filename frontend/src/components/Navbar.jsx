// components/Navbar.jsx
import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-[#FFD9D6] text-center py-1 text-sm text-white font-semibold tracking-wide">
        ONLINE WAREHOUSE SALE ON NOW
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between bg-white shadow-sm px-4 md:px-10 py-3 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xl font-serif tracking-wide text-[#3C5A4C] border border-[#3C5A4C] px-4 py-1"
          >
            AM ARTS
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 text-[#3C5A4C] font-medium">
          <Link to="/sale" className="hover:text-[#5c7b69]">Shop Online Warehouse Sale</Link>
          <Link to="/furniture">Furniture</Link>
          <Link to="/homewares">Homewares</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/styling">Styling</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-[#3C5A4C]">
          <Link to="/account" className="text-sm font-medium">Account</Link>
          <Search className="w-5 h-5 cursor-pointer hover:text-[#5c7b69]" />
          <Link to="/cart">
          <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-[#5c7b69]" />
          </Link>
          

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-[#3C5A4C] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-60 bg-white border rounded-lg shadow-md z-50 p-4 lg:hidden text-[#3C5A4C] font-medium space-y-2">
            <Link to="/sale" onClick={() => setMobileMenuOpen(false)}>Shop Online Warehouse Sale</Link>
            <Link to="/furniture" onClick={() => setMobileMenuOpen(false)}>Furniture</Link>
            <Link to="/homewares" onClick={() => setMobileMenuOpen(false)}>Homewares</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/styling" onClick={() => setMobileMenuOpen(false)}>Styling</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

