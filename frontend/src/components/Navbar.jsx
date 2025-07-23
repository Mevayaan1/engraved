// components/Navbar.jsx
import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-[#FFD9D6] text-center py-1 text-sm text-white font-semibold tracking-wide">
        ONLINE WAREHOUSE SALE ON NOW
      </div>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
        {/* Start - Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="text-xl font-serif tracking-wide text-[#3C5A4C] border border-[#3C5A4C] px-4 py-1"
          >
            AM ARTS
          </Link>
        </div>

        {/* Center - Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#3C5A4C] font-medium gap-4">
            <li><Link to="/sale" className="hover:text-[#5c7b69]">Shop Online Warehouse Sale</Link></li>
            <li><Link to="/furniture">Furniture</Link></li>
            <li><Link to="/homewares">Homewares</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/styling">Styling</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* End - Icons */}
        <div className="navbar-end gap-4 text-[#3C5A4C]">
          <Link to="/account" className="text-sm font-medium">Account</Link>
          <Search className="w-5 h-5 cursor-pointer hover:text-[#5c7b69]" />
          <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-[#5c7b69]" />

          {/* Dropdown for mobile */}
          {/* DaisyUI Dropdown for mobile */}
<div className="dropdown dropdown-end lg:hidden">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </div>
  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-[#3C5A4C] font-medium">
    <li><Link to="/sale">Shop Online Warehouse Sale</Link></li>
    <li><Link to="/furniture">Furniture</Link></li>
    <li><Link to="/homewares">Homewares</Link></li>
    <li><Link to="/shop">Shop</Link></li>
    <li><Link to="/styling">Styling</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    <li><Link to="/about">About</Link></li>
  </ul>
</div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
