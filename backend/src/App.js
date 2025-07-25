
import express, { json } from 'express'
import {createProductsRouter} from './routes/products.js'
import cors from 'cors'
import { error } from './middlewares/error.js'
import { createBrandRouter } from './routes/brand.js'
import { createCategoryRouter } from './routes/category.js'
import { createStockRouter } from './routes/stocks.js'
import { createOrderRouter } from './routes/orders.js'
import { createCustomerRouter } from './routes/customer.js'
import { createOrderItemRouter } from './routes/orderItem.js'

export const createApp = ({ productsModel,brandModel,categoryModel,stockModel,orderModel,customerModel,orderItemModel }) => {
  const app = express()
  app.use(json())
  app.use(cors())
  app.use(express.static("./src/public"))
  app.use("/products",createProductsRouter({ productsModel }))
  app.use("/brands",createBrandRouter({ brandModel }))
  app.use("/categories",createCategoryRouter({ categoryModel }))
  app.use("/stocks",createStockRouter({ stockModel }))
  app.use("/orders",createOrderRouter({ orderModel }))
  app.use("/customers",createCustomerRouter({ customerModel }))
  app.use("/order_items",createOrderItemRouter({ orderItemModel }))

  app.get('/',(req,res)=>{res.send('Home Page')})
  
  const PORT = process.env.PORT ?? 1234
  
  app.listen(PORT,()=>{console.log('Server online on port' + PORT)})
  
  app.use(error)

}