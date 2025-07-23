import { HeaderComponent } from './components/HeaderComponent'
import { Routes, Route } from 'react-router-dom';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './pages/Checkout';
import { FooterComponent } from './components/FooterComponent';
import { Home } from './pages/Home';
function App() {
  return (<>
  <HeaderComponent />
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/products' element={<Products/>}></Route>
    <Route path='/cart' element={<Cart/>} ></Route>
    <Route path='/products/:id' element={<ProductDetails />}></Route>
    <Route path='/checkout' element={<Checkout />} ></Route>
  </Routes>
  <FooterComponent />
  </>)
}

export default App
