import { Link } from "react-router-dom";
import type { ClothingItem } from "../pages/listing/Clothing";

interface ClothingItemCardProps {
  item?: ClothingItem;
  loading?: boolean;
}

// Component to display a single clothing item
export const ClothingItemCard: React.FC<ClothingItemCardProps> = ({
  item,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="w-full max-w-[295px]">
        <div className="bg-gray-200 animate-pulse rounded-[20px] aspect-square w-full"></div>
        <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
          <div className="h-4 sm:h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <Link to={`/product/${item.id}`} className="block w-full">
      <div className="bg-[#F0EEED] rounded-[20px] flex items-center aspect-square justify-center w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="mt-2 font-inter font-bold text-gray-900 leading-none tracking-normal align-middle text-base sm:text-lg md:text-xl">{item.name}</h3>
      <p className="mt-3 font-inter font-bold text-gray-900 leading-none tracking-normal align-middle text-lg sm:text-xl md:text-2xl">${item.price}</p>
    </Link>
  );
};
