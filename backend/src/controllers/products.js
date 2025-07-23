import { validateProduct, validateProductPartial } from "../schemas/products.js"
import { handleZodError, handleInvalidId, isValidUUID, handleNotFound } from "../Utils.js"

export class ProductController {
  constructor({ productsModel }) {
    this.productsModel = productsModel
  }
  getAll = async (req, res) => {
    const { category, brand } = req.query
    const products = await this.productsModel.getAll({ category, brand })
    return res.status(200).json(products)
  }
  getById = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const product = await this.productsModel.getById({ id })
    if (product) return res.status(200).json( product )
    return handleNotFound(res,"Product")
  }
  create = async (req, res) => {
    const result = validateProduct(req.body)
    if (!result.success) handleZodError(result,res)
    const newProduct = await this.productsModel.create({ input: result.data })
    return res.status(201).json({ message: "Product succesfully created", product: newProduct })
  }
  update = async (req, res) => {
    const result = validateProductPartial(req.body)
    if (!result.success || Object.keys(result.data).length === 0) handleZodError(result,res)
    
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const updatedProduct = await this.productsModel.update({ id, input: result.data })
    if (!updatedProduct) return handleNotFound(res,"Product")
    
    return res.status(200).json(updatedProduct)
  }

  delete = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return handleInvalidId(res,uuid=true)

    const result = await this.productsModel.delete({ id })
    if (result === false) return handleNotFound(res,"Product")
    return res.status(200).json({ message: "Product deleted" })
  }
}