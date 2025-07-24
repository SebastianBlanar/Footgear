import { Router } from "express";
import { asyncHandler } from "../Utils.js";
import { OrderItemController } from "../controllers/order_item.js";

export function createOrderItemRouter({ orderItemModel }){
  const router = Router()

  const orderItemController = new OrderItemController({orderItemModel})

  router.get("/",asyncHandler(orderItemController.getAll.bind(orderItemController)))
  router.get("/:id",asyncHandler(orderItemController.getById.bind(orderItemController)))
  router.get("/order/:id",asyncHandler(orderItemController.getByOrderId.bind(orderItemController)))
  router.post("/",asyncHandler(orderItemController.create.bind(orderItemController)))
  router.patch("/:id",asyncHandler(orderItemController.update.bind(orderItemController)))
  router.delete("/:id",asyncHandler(orderItemController.delete.bind(orderItemController)))

  return router
}