import { Link } from "react-router-dom";
import type { ClothingItem } from "../pages/listing/Clothing";

// Component to display a single clothing item
export const ClothingItemCard: React.FC<{ item: ClothingItem }> = ({
  item,
}) => {
  return (
    <Link to={`/product/${item.id}`} className="block w-full">
      <div className="bg-[#F0EEED] rounded-[20px] flex items-center aspect-square justify-center w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-2 font-inter font-bold text-gray-900 leading-none tracking-normal align-middle text-base sm:text-lg md:text-xl">{item.name}</h3>
      <p className="mt-3 font-inter font-bold text-gray-900 leading-none tracking-normal align-middle text-lg sm:text-xl md:text-2xl">${item.price}</p>
    </Link>
  );
};
