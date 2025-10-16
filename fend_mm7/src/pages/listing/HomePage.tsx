// src/components/FakeStore.tsx
import Button from "../../components/Button";
import ClothingCatalog from "./Clothing";
import versaceSvg from "../../assets/icons/versace.svg";
import zaraSvg from "../../assets/icons/zara.svg";
import gucciSvg from "../../assets/icons/gucci.svg";
import pradaSvg from "../../assets/icons/prada-logo-1 1.svg";
import calvinKleinSvg from "../../assets/icons/calvinklein.svg";

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col font-inter">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg2.png)' }}
      >
        <div className="container mx-auto px-4 relative flex items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h1 className="font-alfa-slab font-[400] text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] leading-tight mb-4 md:mb-6 text-black text-center sm:text-left">
              FIND CLOTHES THAT MATCH YOUR STYLE PERFECTLY
            </h1>
            <p className="font-inter text-subtitleColor mb-6 md:mb-8 text-[14px] sm:text-[16px] text-center sm:text-left">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <div className="text-center sm:text-left mb-8 sm:mb-12 md:mb-16">
              <Button className="bg-black text-white rounded-full px-8 py-4 text-sm hover:bg-subtitleColor">
                Shop Now
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center sm:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">200+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">International Brands</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">2,000+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">High-Quality Products</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">30,000+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Brands Section */}
      <section className="bg-black text-white py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 flex flex-wrap justify-between items-center gap-y-4 sm:gap-8">
          <div className="w-1/2 sm:w-1/3 md:w-auto flex justify-center px-2">
            <img src={versaceSvg} alt="Versace" className="h-8 sm:h-10 md:h-12" />
          </div>
          <div className="w-1/2 sm:w-1/3 md:w-auto flex justify-center px-2">
            <img src={zaraSvg} alt="Zara" className="h-8 sm:h-10 md:h-12" />
          </div>
          <div className="w-1/2 sm:w-1/3 md:w-auto flex justify-center px-2">
            <img src={gucciSvg} alt="Gucci" className="h-8 sm:h-10 md:h-12" />
          </div>
          <div className="w-1/2 sm:w-1/3 md:w-auto flex justify-center px-2">
            <img src={pradaSvg} alt="Prada" className="h-8 sm:h-10 md:h-12" />
          </div>
          <div className="w-1/2 sm:w-1/3 md:w-auto flex justify-center px-2">
            <img src={calvinKleinSvg} alt="Calvin Klein" className="h-8 sm:h-10 md:h-12" />
          </div>
        </div>
      </section>
      <section>
        <ClothingCatalog />
      </section>
    </main>
  );
};

export default HomePage;
