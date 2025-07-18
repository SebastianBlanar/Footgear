import { Router } from "express";
import { StockController } from "../controllers/stocks.js";
import { asyncHandler } from '../Utils.js'

export function createStockRouter({ stockModel }){
  const router = Router()
  
  const stockController = new  StockController( { stockModel })

  router.get("/:id",asyncHandler(stockController.getByProductId.bind(stockController)))

  return router
}