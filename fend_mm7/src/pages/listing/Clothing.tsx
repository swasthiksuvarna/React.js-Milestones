// Define TypeScript interfaces

export interface ClothingItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  category: string;
}
import React from "react";
import { useClothingApi } from "./mockApiService";

import casualImg from "../../assets/casual.png";
import formalImg from "../../assets/formal.png";
import partyImg from "../../assets/party.png";
import gymImg from "../../assets/gym.png";
import { ClothingItemCard } from "../../components/ClothingItemCard";

interface StyleCategory {
  name: string;
  image: string;
}

// Component to display a section of clothing items
const ClothingSection: React.FC<{ title: string; items: ClothingItem[]; loading?: boolean }> = ({
  title,
  items,
  loading = false,
}) => {
  return (
    <div className="my-4 sm:my-6 md:my-8 w-full">
      <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-alfa-slab text-center mt-[30px] sm:mt-[45px] md:mt-[61px] mb-[25px] sm:mb-[35px] md:mb-[51px]">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div className="w-full flex justify-center" key={index}>
              <ClothingItemCard loading={true} />
            </div>
          ))
        ) : (
          items.map((item) => (
            <div className="w-full flex justify-center" key={item.id}>
              <ClothingItemCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main component
const ClothingCatalog: React.FC = () => {
  const { data: clothingItems, loading, error } = useClothingApi();
  // Style categories data
  const styleCategories: StyleCategory[] = [
    { name: "Casual", image: casualImg },
    { name: "Formal", image: formalImg },
    { name: "Party", image: partyImg },
    { name: "Gym", image: gymImg },
  ];
  // Group items by category
  const getItemsByCategory = (category: string) => {
    return clothingItems.filter((item) => item.category === category);
  };

  if (loading) {
    return <div className="text-center py-12">Loading clothing items...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  const newArrivals = getItemsByCategory("new_arrivals");
  const casualItems = getItemsByCategory("casual");

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
      {loading ? (
        <>
          <ClothingSection title="NEW ARRIVALS" items={[]} loading={true} />
          <div className="h-px w-full bg-dividerColor bg-opacity-30 my-4 sm:my-6 md:my-8"></div>
          <ClothingSection title="CASUAL" items={[]} loading={true} />
        </>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <ClothingSection title="NEW ARRIVALS" items={newArrivals} />
          )}
          {newArrivals.length > 0 && casualItems.length > 0 && (
            <div className="h-px w-full bg-dividerColor bg-opacity-30 my-4 sm:my-6 md:my-8"></div>
          )}
          {casualItems.length > 0 && (
            <ClothingSection title="CASUAL" items={casualItems} />
          )}
        </>
      )}
      {(newArrivals.length > 0 || casualItems.length > 0) && (
        <div className="h-px w-full bg-dividerColor bg-opacity-30 my-8 sm:my-12 md:my-16"></div>
      )}
      <section className="w-full">
        <div className="w-full p-4 sm:p-6 md:p-[64px] bg-[#F0F0F0] rounded-xl sm:rounded-2xl md:rounded-3xl my-4 sm:my-6 md:my-8">
          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-[400] text-center mb-4 sm:mb-6 md:mb-8 font-alfa-slab">
            BROWSE BY STYLE
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {/* Casual */}
            <div className="sm:col-span-1 md:col-span-2 bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-72">
                <img
                  src={styleCategories[0].image || "/placeholder.svg"}
                  alt={styleCategories[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-bold text-black">
                    {styleCategories[0].name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Formal */}
            <div className="sm:col-span-1 md:col-span-3 bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-72">
                <img
                  src={styleCategories[1].image || "/placeholder.svg"}
                  alt={styleCategories[1].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-bold text-black">
                    {styleCategories[1].name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Party */}
            <div className="sm:col-span-1 md:col-span-3 bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-72">
                <img
                  src={styleCategories[2].image || "/placeholder.svg"}
                  alt={styleCategories[2].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-bold text-black">
                    {styleCategories[2].name}
                  </h2>
                </div>
              </div>
            </div>

            {/* Gym */}
            <div className="sm:col-span-1 md:col-span-2 bg-white rounded-[12px] sm:rounded-[16px] md:rounded-[20px] overflow-hidden">
              <div className="relative h-48 sm:h-60 md:h-72">
                <img
                  src={styleCategories[3].image || "/placeholder.svg"}
                  alt={styleCategories[3].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-bold text-black">
                    {styleCategories[3].name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClothingCatalog;