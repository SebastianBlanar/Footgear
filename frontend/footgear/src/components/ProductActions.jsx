import { useCart } from "../contexts/CartContext";
export function ProductActions({product}) {
  const { addToCart, updateQuantity,removeFromCart } = useCart();
  const handleAdd = () => {
    addToCart(product);
  };  
  const handleDec = () => {
    if(product.quantity == 1) {
      removeFromCart(product.id)
      return

    }
    updateQuantity(product.id,product.quantity - 1)
  }
  return (
    <>
      <div className="actions">
        <button className="add" onClick={handleAdd}>
          +
        </button>
        <button className="remove" onClick={handleDec}>
          -
        </button>
      </div>
      <p className="amount">{product.quantity}</p>
    </>
  );
}
