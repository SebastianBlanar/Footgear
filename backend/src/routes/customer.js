import { Router } from "express";
import { asyncHandler } from "../Utils.js";
import { CustomerController } from "../controllers/customer.js";

export function createCustomerRouter({ customerModel }){
  const router = Router()

  const customerController = new CustomerController({customerModel})

  router.get("/",asyncHandler(customerController.getAll.bind(customerController)))
  router.get("/:id",asyncHandler(customerController.getById.bind(customerController)))
  router.get("/email/:email",asyncHandler(customerController.getById.bind(customerController)))

  router.post("/",asyncHandler(customerController.create.bind(customerController)))
  router.patch("/:id",asyncHandler(customerController.update.bind(customerController)))
  router.delete("/:id",asyncHandler(customerController.delete.bind(customerController)))

  return router
}