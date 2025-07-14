import { useNavigate } from "react-router-dom"
import { ProductSection } from "../components/ProductSection"
import { useCart } from "../contexts/CartContext"
import "../styles/Checkout.css"
import { useEffect } from "react"
export function Checkout(){
  let navigate = useNavigate()
  const { cartItems,totalPrice } = useCart()
  useEffect(()=>{
    if(cartItems.length == 0) navigate("/products")
  },[cartItems,navigate])
  return ( 
        <main>
          <section>
              <div className="wrapper">
                  <ProductSection products={cartItems} checkout={true} />
              </div>
          </section>

          <div className="align">
              <p className="total" id="importeTotalCarrito">TOTAL ${totalPrice}</p>
              <button id="btnComprar">COMPRAR</button>
              <button className="back" >VOLVER</button>
          </div>
        </main>
  )
}