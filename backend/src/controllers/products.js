import { validateProduct, validateProductPartial } from "../schemas/products.js"
import { isValidUUID } from "../Utils.js"

export class ProductController {
  constructor({ productsModel }) {
    this.productsModel = productsModel
  }
  getAll = async (req, res) => {
    const { category, brand } = req.query
    const products = await this.productsModel.getAll({ category, brand })
    if (products == false) return res.status(400).json({ error: "Category or brand not found" })
    return res.status(200).json(products)
  }
  getById = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return res.status(400).json({ error: 'Invalid UUID format' })

    const product = await this.productsModel.getById({ id })
    if (product) return res.status(200).json( product )
    return res.status(400).json({ message: "Product not found" })
  }
  create = async (req, res) => {
    const result = validateProduct(req.body)
    if (!result.success) return res.status(400).json({ message: JSON.parse(result.error.message) })
    const newProduct = await this.productsModel.create({ input: result.data })
    return res.status(201).json({ message: "Product succesfully created", product: newProduct })
  }
  update = async (req, res) => {
    const result = validateProductPartial(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    if (!isValidUUID(id)) return res.status(400).json({ error: 'Invalid UUID format' })

    const updatedProduct = await this.productsModel.update({ id, input: result.data })
    if (updatedProduct === false) {
      return res.status(400).json({ message: "Product not found" })
    }

    return res.status(200).json(updatedProduct)
  }

  delete = async (req, res) => {
    const { id } = req.params
    if (!isValidUUID(id)) return res.status(400).json({ error: 'Invalid UUID format' })

    const result = await this.productsModel.delete({ id })
    if (result === false) return res.status(404).json({ message: "Product not found" })
    return res.status(200).json({ message: "Product deleted" })
  }
}