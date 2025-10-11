import { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  images: string[];
  categoryName: string;
  description: string;
}

export const useProductDetailApi = (productId: string) => {
  const [data, setData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        );

        const item = response.data;
        const mappedProduct: ProductDetail = {
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          images: item.images || [],
          categoryName: item.category?.name || 'Unknown',
          description: item.description,
        };

        setData(mappedProduct);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { data, loading, error };
};
