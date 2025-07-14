import { useCart } from "../contexts/CartContext";

export function CartCounterComponent(){
  const { totalItems } = useCart()

return (
  totalItems > 0 && (
    <span
      id="cart-counter"
      className="absolute -top-3 -right-2 bg-red-600 text-white rounded-full px-1 text-xs font-bold w-5 h-5 flex items-center justify-center">
      {totalItems}
    </span>
  )
);

}