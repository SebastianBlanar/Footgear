import { Router } from "express";
import { asyncHandler } from "../Utils.js";
import { OrderController } from "../controllers/order.js";

export function createOrderRouter({ orderModel }){
  const router = Router()

  const orderController = new OrderController({orderModel})

  router.get("/",asyncHandler(orderController.getAll.bind(orderController)))
  router.get("/:id",asyncHandler(orderController.getById.bind(orderController)))
  router.post("/",asyncHandler(orderController.create.bind(orderController)))
  router.patch("/:id",asyncHandler(orderController.update.bind(orderController)))
  router.delete("/:id",asyncHandler(orderController.delete.bind(orderController)))

  return router
}