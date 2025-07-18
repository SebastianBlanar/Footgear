import Swal from "sweetalert2";
import { useCart } from "../contexts/CartContext";
import { CartCounterComponent } from "./CartCounterComponent";
import { useNavigate } from "react-router-dom";

export function CartComponent() {
  const { totalItems } = useCart();
  let navigate = useNavigate()
  function handleClick() {
    if (totalItems > 0) {
      navigate("/cart")
    } else {
      mostrarMensajeCarrito(
        "Primero debe cargar al menos un producto en su carrito",
        "Error!",
        "error"
      );
    }
  }

  function mostrarMensajeCarrito(titulo, mensaje, tipo) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      timer: 3500,
      showConfirmButton: false,
    });
  }

  return (
  <div
    id="cart-button"
    onClick={() => handleClick()}
    className="relative bg-orange-400 rounded p-1 ml-6 cursor-pointer hover:bg-orange-500 text-black"
  >
    <svg
      id="cart-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      className="h-7 w-7 p-1 fill-current"
    >
      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
    </svg>
    <CartCounterComponent />
  </div>
);

}
