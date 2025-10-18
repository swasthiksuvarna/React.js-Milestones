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
        className="relative min-h-screen bg-cover bg-[center_right_20%] sm:bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/bg2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right 20%'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-60 sm:bg-transparent"></div>
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
      <section className="bg-black text-white py-6 sm:py-8 overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="relative">
            <div className="flex animate-slide sm:animate-slide-desktop gap-4 sm:gap-8 md:gap-12 items-center">
              {[versaceSvg, zaraSvg, gucciSvg, pradaSvg, calvinKleinSvg, versaceSvg, zaraSvg, gucciSvg, pradaSvg, calvinKleinSvg].map((logo, index) => (
                <div key={index} className="flex-shrink-0 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] flex justify-center">
                  <img 
                    src={logo} 
                    alt={['Versace', 'Zara', 'Gucci', 'Prada', 'Calvin Klein'][index % 5]} 
                    className="h-5 sm:h-6 md:h-8 lg:h-10 max-w-full object-contain" 
                  />
                </div>
              ))}
            </div>
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
