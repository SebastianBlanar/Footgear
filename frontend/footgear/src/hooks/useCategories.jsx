import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    async function fetchCategories() {
    try {
      const res = await fetch(
        "http://localhost:1234/categories/"
      );
      if (!res.ok)
        throw new Error(`Èrror fetching categories`);
      const data = await res.json();
      setCategories(data);
      fetchCategories();
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  fetchCategories()
  },[])
  
  return { categories, isLoading, error };
}
