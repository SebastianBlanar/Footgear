import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { createOrder } from "../../api/createOrder";

export function FormComponent({ setOrderConfirmed }) {
  const MySwal = withReactContent(Swal);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { name, email, address, phone } = data;

    let items = cartItems.map((i) =>{
      return i.selected.map((s)=>{
        return {stock_id : s.stock_id, quantity : s.quantity,price : parseFloat(i.price)}
      }  )
    } );
    items = items.flat(Infinity);
    try {
      const orderId = await createOrder({
        input: { name, email, address, phone, items, total_amount: totalPrice },
      });
      MySwal.fire({
        title: <p>¡Pedido realizado!</p>,
        html: `<p>Su pedido está listo.</p><p><strong>ID de pedido:</strong> ${orderId}</p>`,
        icon: "success",
      }).then(() => {
        clearCart();
        setOrderConfirmed(true);
        navigate("/");
      });
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      MySwal.fire({
        title: <p>Error</p>,
        text: "No se pudo registrar el pedido. Inténtelo nuevamente.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 ">
        <label htmlFor="name" className="block mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          className="border rounded-lg w-full p-2 text-white focus:outline-none"
          {...register("name", {
            required: "El campo nombre es obligatorio",
            minLength: {
              value: 5,
              message: "El nombre debe contener al menos 5 caractéres",
            },
            maxLength: {
              value: 50,
              message: "El nombre no puede contener más de 50 caractéres",
            },
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/,
              message: "El nombre no es válido",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-4 ">
        <label htmlFor="email" className="block mb-2">
          Correo Electrónico
        </label>
        <input
          type="text"
          id="email"
          className="border rounded-lg w-full p-2 text-white focus:outline-none"
          {...register("email", {
            required: "El campo email es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "El correo no es válido",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-4 ">
        <label htmlFor="address" className="block mb-2">
          Dirección
        </label>
        <input
          type="text"
          id="address"
          className="border rounded-lg w-full p-2 text-white focus:outline-none"
          {...register("address", {
            required: "El campo dirección es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,#-]+$/,
              message: "Dirección no válida",
            },
            minLength: {
              value: 5,
              message: "La dirección debe tener al menos 5 caracteres",
            },
            maxLength: {
              value: 100,
              message: "La dirección no puede tener más de 100 caracteres",
            },
          })}
        />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          className="border rounded-lg w-full p-2 text-white focus:outline-none"
          {...register("phone", {
            required: "El campo teléfono es obligatorio",
            pattern: {
              value: /^[+]?[\d\s().-]{5,20}$/,
              message: "Teléfono no válido",
            },
            minLength: {
              value: 5,
              message: "El teléfono debe tener al menos 5 caracteres",
            },
            maxLength: {
              value: 20,
              message: "El teléfono no puede tener más de 20 caracteres",
            },
          })}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`block text-white py-2 px-4 rounded-lg my-4 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#fb923c] hover:bg-[#ea580c]"
        }`}
      >
        {isSubmitting ? "Procesando..." : "Realizar pedido"}
      </button>
    </form>
  );
}
