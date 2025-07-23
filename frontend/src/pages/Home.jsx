// import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProduct";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import MessageBanner from "../components/MsgBanner";

const Home = () => {
 
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <MessageBanner/>
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
