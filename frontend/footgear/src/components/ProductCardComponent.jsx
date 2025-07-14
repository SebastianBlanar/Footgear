import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../styles/store.css";
import { ProductActions } from "./ProductActions";

export function ProductCardComponent({ product, checkout = false }) {

  const { addToCart } = useCart();
  
  const handleAdd = () => {
    addToCart(product);
  };
  
  return (
    (
      <div className="product-card">
      <Link to={`/products/${product.id}`} >
      <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        
        {checkout ? (
          <ProductActions product={product} />
        ) : (
          <button
            className="add-to-cart"
            id={product.id}
            onClick={handleAdd}
          >
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
    )
    
  );
}
