import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ProductActions } from "./ProductActions";

export function ProductCardComponent({ product, checkout = false }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-[450px] m-3 flex flex-col justify-center items-center border border-black rounded-md overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 w-fit flex-grow bg-gradient-to-b from-blue-500 to-blue-50">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-[40vh] h-[40vh] block saturate-200"
        />
      </Link>
      <div className="flex flex-col justify-end items-center p-4 bg-black/40 text-white w-full">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-2xl font-bold">${product.price}</p>

        {checkout ? (
          <ProductActions product={product} />
        ) : (
          <button
            className="mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            id={product.id}
            onClick={handleAdd}
          >
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  );
}
