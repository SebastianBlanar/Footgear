import { useCart } from "../contexts/CartContext";

export function CartCounterComponent(){
  const { totalItems } = useCart()

  return (
    totalItems > 0 && (
    <span id="cart-counter" className="counter">
      {totalItems}
    </span>
    ) 
  )
}