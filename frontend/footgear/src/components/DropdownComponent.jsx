import { useEffect, useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useBrands } from "../contexts/BrandsContext";

export function DropdownComponent() {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const { setProducts, allProducts } = useProducts();
  const { getBrandByName } = useBrands();
  useEffect(() => {
    if (selectedValue === "") return;
    if (["nike", "adidas", "puma"].includes(selectedValue)) {
      setProducts(
        allProducts.filter((p) => p.brand_id === getBrandByName(selectedValue).id)
      );
      return;
    }
    if (selectedValue === "todas") {
      setProducts([...allProducts]);
      return;
    }
    if (selectedValue === "a-z")
      setProducts(
        [...allProducts].sort((a, b) => a.name.localeCompare(b.name))
      );
    if (selectedValue === "z-a")
      setProducts(
        [...allProducts].sort((a, b) => b.name.localeCompare(a.name))
      );
    if (selectedValue === "asc")
      setProducts([...allProducts].sort((a, b) => a.price - b.price));
    if (selectedValue === "desc")
      setProducts([...allProducts].sort((a, b) => b.price - a.price));
  }, [selectedValue, setProducts, allProducts]);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative text-black">
      <button
        id="filterButton"
        onClick={handleClick}
        className="bg-orange-400 p-2 rounded ml-6 hover:bg-orange-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-current"
        >
          <path d="M3 4c0-.6.4-1 1-1h16c.6 0 1 .4 1 1 0 .1 0 .3-.1.4L14 12.3v6.8c0 .6-.4 1-1 1-.1 0-.3 0-.4-.1l-3-2c-.3-.2-.6-.5-.6-.9v-4.8L3.1 4.4C3 4.3 3 4.1 3 4z" />
        </svg>
      </button>

      <select
        id="select"
        value={selectedValue}
        onChange={handleChange}
        className={`absolute left-0 mt-12 bg-white rounded shadow-md p-3 transition-all duration-150 text-black text-sm z-50 ${
          isActive
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <optgroup label="Marcas">
          <option value="todas">Todas</option>
          <option value="nike">Nike</option>
          <option value="adidas">Adidas</option>
          <option value="puma">Puma</option>
        </optgroup>
        <optgroup label="Orden">
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </optgroup>
        <optgroup label="price">
          <option value="desc">Mayor a menor</option>
          <option value="asc">Menor a mayor</option>
        </optgroup>
      </select>
    </div>
  );
}
