import { Router } from "express";
import { asyncHandler } from "../Utils.js";
import { BrandController } from "../controllers/brand.js";

export const createBrandRouter = ({ brandModel }) => {
  const router = Router()

  const brandController = new BrandController({ brandModel })

  router.get("/",asyncHandler(brandController.getAll.bind(brandController)))
  router.get("/:id",asyncHandler(brandController.getById.bind(brandController)))
  router.post("/",asyncHandler(brandController.create.bind(brandController)))
  router.patch("/:id",asyncHandler(brandController.update.bind(brandController)))
  router.delete("/:id",asyncHandler(brandController.delete.bind(brandController)))

  return router
}