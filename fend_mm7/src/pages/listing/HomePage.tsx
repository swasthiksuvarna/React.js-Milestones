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
      <section className="relative min-h-[calc(100vh+100px)] sm:min-h-[calc(100vh+110px)] md:min-h-[calc(100vh+120px)]">
        {/* Full background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/bg2.png"
            alt="Fashion background"
            className="object-cover w-full h-full"
          />
          {/* Dark overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
        </div>
        <div className="container mx-auto px-3 sm:px-4 relative flex flex-col md:flex-row min-h-[calc(100vh+100px)] sm:min-h-[calc(100vh+110px)] md:min-h-[calc(100vh+120px)]">
          <div className="relative z-10 w-full md:w-3/4 flex flex-col justify-center pt-32 sm:pt-0">
            <h1 className="font-alfa-slab font-[400] text-[24px] sm:text-[48px] md:text-[64px] leading-tight md:leading-none mb-4 md:mb-6 text-black text-center sm:text-left">
              FIND CLOTHES THAT MATCH YOUR STYLE PERFECTLY
            </h1>
            <p className="font-inter text-subtitleColor mb-6 md:mb-8 max-w-xl text-[14px] sm:text-[16px] text-center sm:text-left">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <div className="text-center sm:text-left">
              <Button className="bg-black text-white rounded-full px-18 py-4 text-sm hover:bg-subtitleColor">
                Shop Now
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center mt-8 sm:mt-12 md:mt-16 gap-6 sm:gap-0">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">200+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">International Brands</p>
              </div>

              {/* Divider line - hidden on mobile */}
              <div className="hidden sm:block h-12 sm:h-16 w-px bg-dividerColor bg-opacity-30 mx-4 sm:mx-6"></div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">2,000+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">High-Quality Products</p>
              </div>

              {/* Divider line - hidden on mobile */}
              <div className="hidden sm:block h-12 sm:h-16 w-px bg-dividerColor bg-opacity-30 mx-4 sm:mx-6"></div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">30,000+</h3>
                <p className="text-subtitleColor text-sm sm:text-base">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keep this div for layout consistency */}
        <div className="relative z-10 w-full md:w-1/2"></div>
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
