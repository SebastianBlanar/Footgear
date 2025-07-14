import { useCart } from "../contexts/CartContext";
export function ProductActions({ product }) {
  const { addToCart, updateQuantity, removeFromCart } = useCart();
  const handleAdd = () => {
    addToCart(product);
  };
  const handleDec = () => {
    if (product.quantity == 1) {
      removeFromCart(product.id);
      return;
    }
    updateQuantity(product.id, product.quantity - 1);
  };
  return (
    <div className="flex flex-col items-center mt-2">
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          className="px-4 py-2 text-white text-sm font-semibold rounded bg-green-600 shadow hover:opacity-80"
          onClick={handleAdd}
        >
          +
        </button>
        <button
          className="px-4 py-2 text-white text-sm font-semibold rounded bg-red-600 shadow hover:opacity-80"
          onClick={handleDec}
        >
          -
        </button>
      </div>
      <p className="mt-2 text-2xl font-bold text-center">{product.quantity}</p>
    </div>
  );
}
