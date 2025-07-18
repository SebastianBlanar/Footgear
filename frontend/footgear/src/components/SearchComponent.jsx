import { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
export function SearchComponent() {
  const {allProducts,setProducts} = useProducts()
  const [search,setSearch] = useState('')
  const handleChange = (event) =>{
    setSearch(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const filteredProducts = [...allProducts].filter(p=>p.name.includes(search.trim().toLowerCase()))
    setProducts(filteredProducts)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Buscar..."
        className="px-3 py-2 border mr-4 border-white rounded-md outline-none bg-white transition-all duration-300 w-[30%] focus-within:w-[70%] md:focus-within:w-auto md:w-auto"
      />
      <button
        id="searchButton"
        type="submit"
        className="text-sm font-bold px-3 py-2 rounded-md bg-orange-400 text-black hover:bg-gray-300 active:border active:border-white w-[20%] md:w-auto"
      >
        Buscar
      </button>
    </form>
  );
}
