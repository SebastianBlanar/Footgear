import { useCart } from "../contexts/CartContext";

export function ProductActions({ product, size, quantity }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDec = () => {
    if (quantity === 1) {
      removeFromCart(product.id,size);
      return;
    }
    updateQuantity(product.id, quantity - 1, size);
  };

  return (
    <div className="flex flex-col items-center mt-4 gap-4">
      <div className="text-center">
        <p className="text-text text-sm font-medium">Talle</p>
        <p className="text-xl font-semibold">{size}</p>
      </div>

        <p className="text-text text-sm font-medium">Cantidad</p>
      <div className="flex items-center gap-3">
        <p className="text-xl font-semibold">{quantity}</p>
        <button
          onClick={handleDec}
          className="bg-bg hover:brightness-110 text-white px-3 rounded-md text-lg shadow transition duration-200"
        >
          –
        </button>
      </div>
    </div>
  );
}
