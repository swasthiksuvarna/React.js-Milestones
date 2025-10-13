// Mock API service for testing
import { useState, useEffect } from "react";
 // Assuming ClothingItem is defined in Clothing.tsx
import axios from "axios";
import type { ClothingItem } from "./Clothing";

// Hook to use the mock API
export const useClothingApi = () => {
  const [data, setData] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/categories/1/products"
        );
        console.log(response.data);
        const mappedProducts = (
          response.data as Array<{
            id: number;
            title: string;
            price: number;
            images: string[];
            category?: { name: string };
          }>
        ).map((item, index) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          imageUrl: item.images[0]?.includes('placehold.co') ? item.images[0] : `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(item.title.slice(0, 10))}`,
          categoryName: item.category?.name || "unknown",
          category: index < 4 ? "new_arrivals" : "casual",
        }));

        console.log(JSON.stringify(mappedProducts));
        setData(mappedProducts);
        setLoading(false);
        // fetchClothingItems();
      } catch (err) {
        console.log(err);
        setError("Failed to fetch clothing items");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { data, loading, error };
};

// Actual API service (would replace mock in production)
