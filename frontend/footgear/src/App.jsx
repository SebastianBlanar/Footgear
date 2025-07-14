import { HeaderComponent } from './components/HeaderComponent'
import { Routes, Route } from 'react-router-dom';
import { Products } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { ProductDetails } from './components/ProductDetails';

function App() {
  return (<>
  <HeaderComponent />
  <Routes>
    <Route path='/products' element={<Products/>}></Route>
    <Route path='/checkout' element={<Checkout/>} ></Route>
    <Route path='/products/:id' element={<ProductDetails />}></Route>
  </Routes>
  </>)
}

export default App
