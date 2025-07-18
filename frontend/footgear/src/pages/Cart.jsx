import { Link, useNavigate } from "react-router-dom";
import { ProductSection } from "../components/ProductSection";
import { useCart } from "../contexts/CartContext";
export function Cart() {
  let navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();
  if (cartItems == 0) navigate("/products/");

  return (
    <main className="bg-black min-h-screen text-white py-6">
      <section>
        <div className="flex justify-center items-center mt-12 w-full">
          <ProductSection products={cartItems} cart={true} />
        </div>
      </section>

      <div className="text-center mt-8 space-y-4 space-x-4">
        <p className="text-3xl font-semibold text-white">TOTAL ${totalPrice}</p>
        <Link to="/checkout/">
          <button
            id="btnComprar"
            className="bg-green-600 text-white font-bold text-lg px-6 py-3 rounded-md shadow hover:bg-blue-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400 transition-all duration-200"
          >
            COMPRAR
          </button>
        </Link>
        <Link to="/products/">
          <button
            className="bg-red-600 text-white font-bold text-lg px-6 py-3 rounded-md shadow hover:bg-blue-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400 transition-all duration-200"
          >
            VOLVER
          </button>
        </Link>
      </div>
    </main>
  );
}
