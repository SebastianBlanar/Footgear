import { Router } from "express";
import { StockController } from "../controllers/stocks.js";
import { asyncHandler } from '../Utils.js'

export function createStockRouter({ stockModel }){
  const router = Router()
  
  const stockController = new  StockController( { stockModel })

  router.get("/",asyncHandler(stockController.getAll.bind(stockController)))
  router.get("/:id",asyncHandler(stockController.getById.bind(stockController)))
  router.get("/product/:id",asyncHandler(stockController.getByProductId.bind(stockController)))
  
  router.patch("/:id",asyncHandler(stockController.update.bind(stockController)))
  router.delete("/:id",asyncHandler(stockController.delete.bind(stockController)))
  router.post("/",asyncHandler(stockController.create.bind(stockController)))

  return router
}