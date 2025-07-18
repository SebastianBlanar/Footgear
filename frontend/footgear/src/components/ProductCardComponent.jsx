import { Link } from "react-router-dom";
import { ProductActions } from "./ProductActions";

export function ProductCardComponent({ product, size,quantity, cart = false }) {
  const formattedName = product.name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-sm w-full m-4 rounded-xl overflow-hidden bg-surface border border-surface shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <Link
        to={`/products/${product.id}`}
        className="block focus:outline-none"
        aria-label={`Ir al producto ${formattedName}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain p-4 bg-bg"
        />
      </Link>

      <div className="flex flex-col items-center gap-2 px-4 py-3 text-text">
        <h3 className="text-lg font-semibold text-center">{formattedName}</h3>
        <p className="text-xl font-bold">${product.price}</p>

        {cart ? (
          <ProductActions product={product} size={size} quantity={quantity} />
        ) : (
          <Link
            to={`/products/${product.id}`}
            className="focus:outline-none"
            aria-label={`Ir al producto ${formattedName}`}
          >
            <button
              className="mt-2 px-4 py-2 bg-bg text-white text-sm font-medium rounded hover:bg-black transition"
              id={product.id}
            >
              Ver detalles
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
