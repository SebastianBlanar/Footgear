import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";

export function ProductDetails(){
  const { getProductById } = useProducts()
  let params = useParams()
  const product = getProductById(params.id)
  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} />
    </div>
  ) 

}