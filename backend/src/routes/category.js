import { Router } from "express";
import { asyncHandler } from "../Utils.js";
import { CategoryController } from "../controllers/category.js";

export function createCategoryRouter ({ categoryModel } ){
  const router = Router()

  const categoryController = new CategoryController({ categoryModel })

  router.get("/",asyncHandler(categoryController.getAll.bind(categoryController)))
  router.get("/:id",asyncHandler(categoryController.getById.bind(categoryController)))
  router.post("/",asyncHandler(categoryController.create.bind(categoryController)))
  router.patch("/:id",asyncHandler(categoryController.update.bind(categoryController)))
  router.delete("/:id",asyncHandler(categoryController.delete.bind(categoryController)))

  return router
}