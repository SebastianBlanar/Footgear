
import express, { json } from 'express'
import {createProductsRouter} from './routes/products.js'
import cors from 'cors'
import { error } from './middlewares/error.js'
import { createBrandRouter } from './routes/brand.js'
import { createCategoryRouter } from './routes/category.js'

export const createApp = ({ productsModel,brandModel,categoryModel }) => {
  const app = express()
  app.use(json())
  app.use(cors())
  app.use(express.static("./src/public"))
  app.use("/products",createProductsRouter({ productsModel }))
  app.use("/brands",createBrandRouter({ brandModel }))
  app.use("/categories",createCategoryRouter({ categoryModel }))

  app.get('/',(req,res)=>{res.send('Home Page')})
  
  const PORT = process.env.PORT ?? 1234
  
  app.listen(PORT,()=>{console.log('Server online on port' + PORT)})
  
  app.use(error)

}