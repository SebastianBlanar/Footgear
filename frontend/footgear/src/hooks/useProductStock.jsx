import { useEffect, useState } from "react";

export function useProductStock({ productId }) {
  const [productStock, setProductStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    async function fetchProductStock() {
    try {
      const res = await fetch(
        "http://localhost:1234/stocks/" + productId
      );
      if (!res.ok)
        throw new Error(`Èrror getting stock from product : ${productId}`);
      const data = await res.json();
      setProductStock(data);
      fetchProductStock();
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  if(productId) fetchProductStock()
  },[productId])
  
  return { productStock, isLoading, error };
}
