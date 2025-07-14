import { asyncHandler } from '../Utils.js'
import { Router } from "express";
import { ProductController } from "../controllers/products.js";

export const createProductsRouter = ({ productsModel }) => {
  const router = Router()

  const productsController = new ProductController({ productsModel })

  router.get('/', asyncHandler(productsController.getAll.bind(productsController)))
  router.post('/', asyncHandler(productsController.create.bind(productsController)))
  router.get('/:id', asyncHandler(productsController.getById.bind(productsController)))
  router.patch('/:id', asyncHandler(productsController.update.bind(productsController)))
  router.delete('/:id', asyncHandler(productsController.delete.bind(productsController)))


  return router
}
