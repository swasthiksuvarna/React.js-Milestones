// Mock API service for testing
import { useState, useEffect } from "react";
import axios from "axios";
import type { ClothingItem } from "./Clothing";

// Hook to use the mock API
export const useClothingApi = () => {
  const [data, setData] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.escuelajs.co/api/v1/products");
        
        const mappedProducts = response.data.slice(0, 8).map((item: any, index: number) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          imageUrl: item.images[0] || `https://via.placeholder.com/400x400/f0f0f0/333333?text=${encodeURIComponent(item.title.slice(0, 10))}`,
          categoryName: item.category?.name || "Clothes",
          category: index < 4 ? "new_arrivals" : "casual",
        }));

        setData(mappedProducts);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return { data, loading, error };
};
