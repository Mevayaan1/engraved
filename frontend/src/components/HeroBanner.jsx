// components/HeroBanner.jsx

import HeroImg from "../assets/img/Hero2.webp";

const HeroBanner = () => {
  return (
    <div className="relative z-0 h-[80vh] w-full">
      <img
        src={HeroImg}
        alt="Hero Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10"/>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#3C5A4C]">
        <p className="uppercase text-xs tracking-widest mb-2">
          Delivery and Local Pick Up in India
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Online Only Warehouse Sale
          <br />
          Up to 70% Off Store-Wide
        </h1>
        <button className="btn mt-6 bg-[#AEC2B1] border-none text-white hover:bg-[#96b39b]">
          Shop
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
