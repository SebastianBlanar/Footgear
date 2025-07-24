import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProductStock } from "../hooks/useProductStock";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductsContext";
import { useEffect } from "react";

const sortStock = (stock) =>  [...stock].sort((a,b)=> a.size - b.size)

export function ProductDetails() {
  const {getProductById} = useProducts()
  const {addToCart} = useCart()
  const { id } = useParams();
  const product = getProductById(id)
  const { productStock, isLoading, error } = useProductStock( { productId : id } )
  const formatName = (name) => name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  if(error) return null
  if(isLoading) return <h1>Loading...</h1>
  if (!product) return null;

  const handleSize = (selectedSize) => {
    setSize(selectedSize)
  }

  const handleAdd = () => {
    if(size !== "") addToCart(product,size,quantity,productStock.find(s => s.size == size).id)
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12 flex flex-col md:flex-row gap-10 mt-5">
      {/* Imágenes */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
        <div className="flex md:flex-col gap-2 md:bg-gradient-to-tr from-gray-950 via-slate-800 to-gray-900">
            <img className="mt-[-10%]" src={product.image} alt={formatName(product.name)} />
        </div>
      </div>

      {/* Información */}
      <div className="w-full md:w-1/2 space-y-4 mt-8">
        <h1 className="text-2xl font-semibold">{formatName(product.name)}</h1>
        <p className="text-xl text-blue-400 font-bold">${product.price}</p>

        {/* Cantidad */}
        <div className="flex items-center gap-2">
          <span>Quantity</span>
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-2 py-1 bg-gray-700 rounded cursor-pointer"
          >
            –
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-2 py-1 bg-gray-700 rounded cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Talles */}
        <div>
          <p className="text-sm">Size</p>
          <div className="flex gap-2 mt-1">
            {sortStock(productStock).map((s, i) => (
              <button
                key={i}
                onClick={() => handleSize(s.size)}
                className={`px-4 py-1 rounded border cursor-pointer ${
                  size === s.size ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500 bg-transparent hover:bg-blue-950"
                }`}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <button 
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded text-sm font-semibold"
        onClick={handleAdd}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
