import { createApp } from './App.js'
import { initDB } from './db/init.js'
import { BrandModel } from './models/mysql/BrandModel.js'
import { CategoryModel } from './models/mysql/CategoryModel.js'
import { ProductsModel } from './models/mysql/ProductsModel.js'

const startServer = async () => {
  try {
    await initDB()
    createApp({ productsModel: ProductsModel, brandModel: BrandModel, categoryModel: CategoryModel })
  } catch (error) {
    console.error('❌ Error initializing the database:', error)
  }
}

startServer()