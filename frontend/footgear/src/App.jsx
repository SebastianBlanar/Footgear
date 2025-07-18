import { HeaderComponent } from './components/HeaderComponent'
import { Routes, Route } from 'react-router-dom';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './pages/Checkout';
function App() {
  return (<>
  <HeaderComponent />
  <Routes>
    <Route path='/products' element={<Products/>}></Route>
    <Route path='/cart' element={<Cart/>} ></Route>
    <Route path='/products/:id' element={<ProductDetails />}></Route>
    <Route path='/checkout' element={<Checkout />} ></Route>
  </Routes>
  </>)
}

export default App
