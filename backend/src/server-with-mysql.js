import { createApp } from './App.js'
import { initDB } from './db/init.js'
import { BrandModel } from './models/mysql/BrandModel.js'
import { CategoryModel } from './models/mysql/CategoryModel.js'
import { ProductsModel } from './models/mysql/ProductsModel.js'
import { StockModel } from './models/mysql/StockModel.js'
import { CustomerModel } from './models/mysql/CustomerModel.js'
import { OrderModel } from './models/mysql/OrderModel.js'
import { OrderItemModel } from './models/mysql/OrderItemModel.js'
const startServer = async () => {
  try {
    await initDB()
    createApp(
      {
        productsModel: ProductsModel,
        brandModel: BrandModel,
        categoryModel: CategoryModel,
        stockModel: StockModel,
        orderModel: OrderModel,
        customerModel: CustomerModel,
        orderItemModel : OrderItemModel
      })
  } catch (error) {
    console.error('❌ Error initializing the database:', error)
  }
}

startServer()