import { useContext, createContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState(null);
  const getProductById = (id) => products.find((p)=> p.id == id)
  

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:1234/products");
        if (!res.ok) {
          const message = await res.text();
          throw new Error(
            `Error while fetching products - ${res.status} - ${message}`
          );
        }
        const data = await res.json();
        setAllProducts(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
        setError(error.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        allProducts,
        setAllProducts,
        getProductById,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
export function useProducts() {
  return useContext(ProductsContext);
}
